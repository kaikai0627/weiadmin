<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 商城分类页管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div ref="contentHeight">
            <el-card class="box-card">
                <div ref="topHeight">
                    <div class="handle-box">
                        <el-button
                            size="medium"
                            type="primary"
                            icon="el-icon-plus"
                            @click="openAddModal(null, null, null, 'add')"
                            >添加主分类</el-button
                        >
                        <el-button
                                type="success"
                                icon="el-icon-search"
                                @click="getData"
                                >刷新</el-button
                            >
                        <el-button
                            size="medium"
                            type="primary"
                            icon="el-icon-download"
                            @click="exportData(1)"
                            >导出表格</el-button
                        >
                        <!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button> -->
                    </div>
                </div>
                <el-table
                    :data="data.children"
                    size="small"
                    border
                    fixed
                    class="table"
                    style="width: 100%"
                    :max-height="tabHeight"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    row-key="id"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="caption"
                        label="分类名称"
                    ></el-table-column>
                    <el-table-column prop="data.nodeLevel" label="层级"></el-table-column>
                    <el-table-column prop="data.sortId" label="排序"></el-table-column>
                    <el-table-column prop="data.shopId" label="商城编号"></el-table-column>
                    <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.data.imgURL"
                            :preview-src-list="[scope.row.imgURL]"
                        ></el-image>
                    </template>
                    </el-table-column>
                    
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="400"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.data.nodeLevel==0"
                                type="primary"
                                size="mini"
                                icon="el-icon-add"
                                @click="openAddModal(scope.row.id, scope.row.caption, null, 'add')"
                                >增加子类</el-button
                            >
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="openAddModal(scope.row.data.parentId, scope.row.data.parentName, scope.row.id, 'update')"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                @click="remove(scope.row.id, scope.$index)"
                                >删除</el-button
                            >                            
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>-->

        <AddUser v-if="addModal" 
                 :parentId="currentParentId" 
                 :parentName="currentParentName" 
                 @cancel="onModalCancel" />
        <UpdateUser
            v-if="updateModal"
            :keyId="updateKeyId"
            :parentId="currentParentId" 
            :parentName="currentParentName" 
            @cancel="onModalCancel"
        />
    </div>
</template>

<script>
//import dayjs from "dayjs";
import { post } from "../../../common/net/axios-cfg";
import common from "@/common/mixins/common.js";
import AddUser from "./components/add.vue";
import UpdateUser from "./components/update.vue";

export default {
    name: "user_index",
    data() {
        return {
            addModal: false, // 添加模式
            currentParentId: "",
            currentParentName: "",
            updateModal: false, // 修改模式
            updateKeyId: null,
            removeModal: false, // 删除模式
            setting: {
                loading: true,
                showBorder: true
            },
            data: {},
            multipleSelection: [], // 多选的数据
            tabHeight: null
        };
    },
    created() {
        this.getData();
    },
    mounted() {
        // 计算table最大高度
        let that = this;
        this.tabHeight = common.tabHeight(
            this.$refs.topHeight,
            this.$refs.contentHeight
        );
        window.onresize = function temp() {
            that.tabHeight = common.tabHeight(
                that.$refs.topHeight,
                that.$refs.contentHeight
            );
        };
    },
    components: {
        AddUser,
        UpdateUser
    },
    methods: {
        /**
         * @description 获取用户列表
         */
        getData() {
            let that = this;
            this.setting.loading = true;
            post("/api/weiadm/v1/waproducttype/tree", {
                shopId: 0
            })
                .then(res => {
                    that.data = res.data;
                    that.setting.loading = false;
                    //console.info(JSON.stringify(res.data.records[0].roles));
                })
                .catch(err => {
                    console.info("发生错误:");
                    console.info(err);
                    that.$message.error(err.message);
                    that.setting.loading = false;
                });
        },
        /**
         * @description 打开模态窗口
         * @param uid 用户ID
         * @param type 打开类型
         */
        openAddModal(curParentId, curParentName, updateKey,  type = "update") {
            if (updateKey == null) {
                this.currentParentId = curParentId;
                this.currentParentName = curParentName;
                this.addModal = true;
            } else if (type === "update") {
                this.currentParentId = curParentId;
                this.currentParentName = curParentName;
                this.updateKeyId = updateKey;
                this.updateModal = true;
            }
        },
        /**
         * @description 关闭模态窗口
         * @param type 窗口类型
         * @param reload 是否重新加载数据
         */
        onModalCancel(type, reload = false) {
            console.info("接收到子窗体cancel事件,type=" + type);
            switch (type) {
                case "add":
                    {
                        this.addModal = false;
                    }
                    break;
                case "update":
                    {
                        this.updateModal = false;
                    }
                    break;
                case "resetPassword":
                    {
                        this.resetPasswordModal = false;
                    }
                    break;
            }
            if (reload) this.getData();
        },
        // 触发搜索按钮
        handleSearch() {
            this.getData();
        },
        // 删除操作
        remove(uid, index) {
            let that = this;
            // 二次确认删除
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.removeModal = true;
                    this.setting.loading = true;
                    post("/api/weiadm/v1/waproducttype/remove/{id}", null, {
                        id: uid
                    })
                        .then(() => {
                            that.$message.success("删除成功");
                            that.data.records.splice(index, 1);
                            that.setting.loading = false;
                            this.removeModal = false;
                        })
                        .catch(err => {
                            that.$message.error(err.message);
                            that.setting.loading = false;
                            this.removeModal = false;
                        });
                })
                .catch(() => {});
        },        
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
