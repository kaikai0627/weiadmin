<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="active"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            @select="slideSelect"
        >
            <!-- 一级菜单 -->
            <div v-for="(item, stairIndex) in items" :key="stairIndex">
                <template v-if="item.subs">
                    <el-submenu :index="stairIndex | numToString">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <div
                            v-for="(subItem, secondIndex) in item.subs"
                            :key="secondIndex"
                        >
                            <el-submenu
                                v-if="subItem.subs"
                                :index="stairIndex + '_' + secondIndex"
                            >
                                <template slot="title">{{
                                    subItem.title
                                }}</template>
                                <el-menu-item
                                    v-for="(threeItem, i) in subItem.subs"
                                    :key="i"
                                    :index="
                                        stairIndex + '_' + secondIndex + '_' + i
                                    "
                                    @click="openPage(threeItem.index)"
                                    >{{ threeItem.title }}</el-menu-item
                                >
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="stairIndex + '_' + secondIndex"
                                :key="subItem.index"
                                @click="openPage(subItem.index)"
                                >{{ subItem.title }}</el-menu-item
                            >
                        </div>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item
                        :index="stairIndex | numToString"
                        :key="item.index"
                        @click="openPage(item.index)"
                    >
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </div>
        </el-menu>
    </div>
</template>

<script>
import bus from "../../../common/bus/bus";
import common from "@/common/mixins/common.js";
export default {
    mixins: [common],
    data() {
        return {
            collapse: false,
            active: localStorage.getItem("navActive") || '0',
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-s-grid',
                    index: 'template',
                    title: '商城设置',
                    subs: [
                        {
                            index: 'template_page_index',
                            title: '页面管理'
                        },
                        {
                            index: 'template_page_add',
                            title: '页面demo'
                        },
                        {
                            index: 'product_wtype',
                            title: '商城类别设置'
                        }
                    ]
                },                
                {
                    icon: 'el-icon-s-promotion',
                    index: 'system',
                    title: '系统设置',
                    subs: [
                        {
                            index: 'system_user',
                            title: '用户管理'
                        },
                        {
                            index: 'system:role',
                            title: '角色管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-grid',
                    index: 'showdemotable',
                    title: '基础表格'
                },
                {
                    icon: 'el-icon-s-promotion',
                    index: '3',
                    title: '多级菜单',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-goods',
                    index: 'shopgoodslist',
                    title: '商品列表'
                },
            ]
        };
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on("collapse", msg => {
            this.collapse = msg;
            bus.$emit("collapse-content", msg);
        });
    },
    watch: {
        $route(to, form) {
            // 本地存储 当前激活菜单的 index
            localStorage.setItem("navActive", this.active)
        }
    },
    methods: {
        // 监控侧边栏导航 更新active
        slideSelect(key, keyPath) {
            this.active = key
        },
        /**
         * 侧边导航菜单跳转 
         * 跳转方式需指定为name方式跳转 
         * 否则使用动态路由会出现问题
        */
        openPage(url) {
            this.$router.push({
                name: url
            })
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
