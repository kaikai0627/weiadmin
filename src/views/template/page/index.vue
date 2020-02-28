<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 微页面管理
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
                            @click="toTemplate('add')"
                            >添加页面</el-button
                        >
                        <!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button> -->
                        <el-button
                            size="medium"
                            type="primary"
                            icon="el-icon-download"
                            @click="exportData(1)"
                            >导出表格</el-button
                        >
                    </div>
                    <el-form
                        :inline="true"
                        :model="search"
                        class="demo-form-inline border-top mt-3 pt-3"
                    >
                        <el-form-item label="关键词">
                            <el-input
                                v-model="search.value"
                                placeholder="请输入要搜索的数据"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="success"
                                size="medium"
                                icon="el-icon-search"
                                @click="getData"
                                >查询</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
                <el-table
                    :data="data.records"
                    size="small"
                    border
                    fixed
                    class="table"
                    style="width: 100%"
                    :max-height="tabHeight"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        prop="shopId"
                        label="商城编号"
                    ></el-table-column>
                    <el-table-column
                        prop="fid"
                        label="页面编号"
                    ></el-table-column>
                    <el-table-column
                        prop="pageName"
                        label="页面名称"
                    ></el-table-column>
                    <el-table-column
                        prop="pageType"
                        label="页面类型"
                    ></el-table-column>
                    <el-table-column
                        prop="effectiveDate"
                        label="生效时间"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="modiName"
                        label="创建人"
                    ></el-table-column>
                    <el-table-column
                        prop="modiDate"
                        label="修改时间"
                    ></el-table-column>
                    <el-table-column
                        prop="modiDate"
                        label="修改时间"
                        width="110"
                    ></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="
                                    toTemplate('update',scope.row.pageId)
                                "
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                @click="
                                    removePage(scope.row.userId, scope.$index)
                                "
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="data.current"
                        :page-size="data.size"
                        :total="data.total"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </el-card>
        </div>
        <!-- <AddPage v-if="addModal" :roles="roles" @cancel="onModalCancel" />
        <UpdatePage
            v-if="updateModal"
            :roles="roles"
            :uid="updatePageId"
            @cancel="onModalCancel"
        /> -->
        <!-- <ResetPassword v-if="resetPasswordModal" :uid="resetPasswordUserId" @cancel="onModalCancel"/> -->
    </div>
</template>

<script>
import { post } from "@/common/net/axios-cfg";
import common from "@/common/mixins/common.js";
import AddPage from "./components/add.vue";
import UpdatePage from "./components/update.vue";

export default {
    name: "page_index",
    data() {
        return {
            // addModal: false, // 添加模式
            // updateModal: false, // 修改模式
            updatePageId: null,
            removeModal: false, // 删除模式
            setting: {
                loading: true,
                showBorder: true
            },
            search: {
                type: "name",
                value: ""
            },
            data: {},
            dataFilter: {
                page: 1,
                pageSize: 10
            },
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
            console.log(that.tabHeight)
        };
    },
    components: {
        AddPage,
        UpdatePage
    },
    methods: {
        /**
         * @description 获取用户列表
         */
        getData() {
            let that = this;
            this.setting.loading = true;
            post("/api/weiadm/v1/wapage/list", {
                shopId: 0,
                waPageId: 0,  // 页面id
                waPageName: this.search.value,  // 页面名称
                createDateFrom: null,  // 创建时间 开始
                createDateTo: null,   // 创建时间 结束
                waPageType: -1, // 页面类型 null或-1 全部 0普通 10主页

                page: this.dataFilter.page,
                pageSize: this.dataFilter.pageSize,
                asc: true                
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
        // 分页导航
        handlePageChange(val) {
            //this.$set(this.query, 'pageIndex', val);
            this.dataFilter.page = val;
            this.getData();
        },
        /**
         * @description 打开模态窗口
         * @param uid 用户ID
         * @param type 打开类型
         */
        openAddModal(id, type) {
            console.log(id)
            if (id == null) {
                this.addModal = true;
            } else if (type === "update") {
                this.updatePageId = id;
                this.updateModal = true;
            }
        },
        /**
         * @description 关闭模态窗口
         * @param type 窗口类型
         * @param reload 是否重新加载数据
         */
        onModalCancel(type, reload = false) {
            //console.info("接收到子窗体cancel事件,type="+ type)
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
            }
            if (reload) this.getData();
        },
        // 跳至添加模板或修改模板
        toTemplate(type,id) {
            if(type == 'add') {
                this.$router.push('template_page_add')
            } else if(type == 'update') {
                this.$router.push({
                    path: 'template_page_update/'+id
                })
            } else {
                return
            }
        },
        // 触发搜索按钮
        handleSearch() {
            //this.$set(this.query, 'pageIndex', 1);
            this.dataFilter.page = 1;
            this.getData();
        },
        // 删除操作
        removePage(uid, index) {
            let that = this;
            // 二次确认删除
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            })
                .then(() => {
                    this.removeModal = true;
                    this.setting.loading = true;
                    post("/api/weiadm/v1/user/remove/{id}", null, {
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
        // delAllSelection() {
        //     const length = this.multipleSelection.length;
        //     let str = '';
        //     this.delList = this.delList.concat(this.multipleSelection);
        //     for (let i = 0; i < length; i++) {
        //         str += this.multipleSelection[i].name + ' ';
        //     }
        //     this.$message.error(`删除了${str}`);
        //     this.multipleSelection = [];
        // },
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
