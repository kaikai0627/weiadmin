<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户管理
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
                            @click="openAddModal(null, 'add')"
                            >添加用户</el-button
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
                        type="selection"
                        width="55"
                        align="center"
                    ></el-table-column>
                    <!-- <el-table-column prop="userId" label="ID" width="55" align="center"></el-table-column> -->
                    <el-table-column
                        prop="employNo"
                        label="账号"
                    ></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <!-- <el-table-column label="头像" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.avatarUrl"
                            :preview-src-list="[scope.row.avatarUrl]"
                        ></el-image>
                    </template>
        </el-table-column>-->

                    <el-table-column
                        prop="sex"
                        width="50"
                        label="性别"
                    ></el-table-column>
                    <!-- <el-table-column prop="birthDate" label="出生日期"></el-table-column>
        <el-table-column prop="jobDate" label="工作日期"></el-table-column>-->
                    <el-table-column prop="duty" label="职位"></el-table-column>
                    <el-table-column
                        prop="mobi"
                        label="电话"
                        width="110"
                    ></el-table-column>

                    <!-- <el-table-column prop="openId" label="微信id"></el-table-column> -->
                    <!-- <el-table-column prop="deptNo" label="部门编号"></el-table-column> -->
                    <el-table-column
                        prop="deptName"
                        label="部门名称"
                    ></el-table-column>
                    <el-table-column
                        prop="isActive"
                        label="状态"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-tag
                                :type="
                                    scope.row.isActive ? 'success' : 'danger'
                                "
                                :lable="scope.row.isActive ? '正常' : '禁用'"
                                >{{
                                    scope.row.isActive ? "正常" : "禁用"
                                }}</el-tag
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="roles" label="角色组">
                        <template slot-scope="scope">
                            <el-tag
                                v-for="(item, index) in scope.row.roles"
                                :key="index"
                                :type="'success'"
                                :lable="scope.row.roles[index].groupName"
                                >{{ scope.row.roles[index].groupName }}</el-tag
                            >
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="roles" label="商名称"></el-table-column> -->

                    <el-table-column
                        prop="lastLoginTime"
                        label="登录时间"
                        width="110"
                        :show-overflow-tooltip="true"
                    ></el-table-column>

                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="400"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="
                                    openAddModal(scope.row.userId, 'update')
                                "
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                @click="
                                    removeUser(scope.row.userId, scope.$index)
                                "
                                >删除</el-button
                            >
                            <el-button
                                type="danger"
                                size="mini"
                                @click="lockUser(scope.row, scope.$index)"
                                >锁定</el-button
                            >
                            <!-- icon="el-icon-lock" -->
                            <el-button
                                type="danger"
                                size="mini"
                                @click="
                                    openAddModal(
                                        scope.row.userId,
                                        'resetPassword'
                                    )
                                "
                                >修改密码</el-button
                            >
                            <!-- icon="el-icon-key" -->
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

        <AddUser v-if="addModal" :roles="roles" @cancel="onModalCancel" />
        <UpdateUser
            v-if="updateModal"
            :roles="roles"
            :uid="updateUserId"
            @cancel="onModalCancel"
        />
        <ResetPassword
            v-if="resetPasswordModal"
            :uid="resetPasswordUserId"
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
import ResetPassword from "./components/reset-password.vue";

export default {
    name: "user_index",
    data() {
        return {
            addModal: false, // 添加模式
            updateModal: false, // 修改模式
            updateUserId: null,
            resetPasswordModal: false, // 更改密码模式
            resetPasswordUserId: null,
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
            roles: null,
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
        UpdateUser,
        ResetPassword
    },
    methods: {
        /**
         * @description 获取用户列表
         */
        getData() {
            let that = this;
            this.setting.loading = true;
            post("/api/weiadm/v1/user/list", {
                keyword: this.search.value,
                keytype: this.search.type,
                page: this.dataFilter.page,
                pageSize: this.dataFilter.pageSize
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
         * @description 获取角色列表
         */
        async getRoleList() {
            let that = this;
            try {
                let res = await post("/api/weiadm/v1/sys/role/list");
                that.roles = res.data;
            } catch (error) {
                that.$throw(error);
            }
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
        openAddModal(uid, type = "update") {
            if (uid == null || type === "update") {
                if (this.roles == null) {
                    this.getRoleList();
                }
            }
            if (uid == null) {
                this.addModal = true;
            } else if (type === "update") {
                this.updateUserId = uid;
                this.updateModal = true;
            } else {
                this.resetPasswordUserId = uid;
                this.resetPasswordModal = true;
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
            //this.$set(this.query, 'pageIndex', 1);
            this.dataFilter.page = 1;
            this.getData();
        },
        // 删除操作
        removeUser(uid, index) {
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
        /**
         * @description 锁定/解锁用户
         */
        async lockUser(obj) {
            let that = this;
            this.setting.loading = true;
            let isActive = obj.isActive;
            let req_url = isActive == true ? "lock" : "unlock";
            let req_rep = !isActive;
            let req_msg = isActive == true ? "已锁定" : "已解锁";

            post("/api/weiadm/v1/user/{method}/{uid}", null, {
                uid: obj.userId,
                method: req_url
            })
                .then(() => {
                    that.$message.success(req_msg);
                    obj.isActive = req_rep;
                    that.setting.loading = false;
                })
                .catch(err => {
                    that.$message.success(err.message);
                    that.setting.loading = false;
                });
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
