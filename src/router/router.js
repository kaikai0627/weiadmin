let routes = [{
        path: '/',
        redirect: '/dashboard'
    },

    {
        path: '/',
        component: () =>
            import ('@/views/layout/index.vue'),
        meta: { title: '自述文件' },
        children: [{
                path: '/dashboard',
                name: 'dashboard',
                component: () =>
                    import ('@/views/home/dashboard/Dashboard.vue'),
                meta: { title: '系统首页' }
            },
            {
                path: '/messageshow',
                component: () =>
                    import ('@/views/home/message/Message.vue'),
                meta: { title: '提醒消息' }
            },
            {
                path: 'template_page_index',
                name: 'template_page_index',
                component: () =>
                    import ('@/views/template/page/index'),
                meta: { title: '页面管理', access: ['template:page:list'] }
            },
            {
                path: 'template_page_add',
                name: 'template_page_add',
                component: () =>
                    import ('@/views/template/page/components/add.vue'),
                meta: { title: '添加模板' }
            },
            {
                path: 'template_page_update/:pageId',
                name: 'template_page_update',
                component: () =>
                    import ('@/views/template/page/components/update.vue'),
                meta: { title: '修改模板', access: ['template:page:update'] }
            },
            {
                path: '/product_wtype',
                name: 'product_wtype',
                component: () =>
                    import ('@/views/product/wtype/index'),
                meta: { title: '商城类别管理', access: ['product:wtype:list'] }
            },
            {
                path: '/system_user',
                name: 'system_user',
                component: () =>
                    import ('@/views/system/user/index'),
                meta: { title: '用户管理', access: ['system:user:list'] }
            },
            //{ path: 'person-stalker',meta:{title: '角色管理',}, name: 'system_role', component: () => import('@/views/system/role') },
            //{ path: 'dict',meta:{title: '用户字典',access: ['system:dict:list']}, name: 'system_dict', component: () => import('@/views/system/dict') },
            // { path: 'resource',meta:{title: '资源管理',access: ['system:resource:list']}, name: 'system_resource', component: () => import('@/views/system/resource') },
            //{ path: 'log',meta:{title: '系统日志',access: ['system:log:list']}, name: 'system_log', component: () => import('@/views/system/log') },
            {
                path: '/shopgoodslist',
                component: () =>
                    import ('@/views/shop/goods/list.vue'),
                meta: { title: '商品列表' }
            },
            {
                path: '/showdemotable',
                component: () =>
                    import ('@/views/demo/basetable/BaseTable.vue'),
                meta: { title: '表格演示' }
            },
            {
                path: '/404',
                component: () =>
                    import ('@/views/error-page/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '/403',
                component: () =>
                    import ('@/views/error-page/403.vue'),
                meta: { title: '403' }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login/Login.vue'),
        meta: { title: '登录' }
    },
    // {
    // path: '*',
    // redirect: '/404'
    // }
]

//*** 以下为自动路由, 暂时屏蔽 */
/**
 * 规则：
 * 一、例如：index/index, shop/index以index结尾的，path和name默认去除index
 * 二、例如：shop/list, 默认生成name和shop_list(如果结尾为index，例如shop/index则为shop)
 * 三、填写后不会自动生成
 */

// let routes = [{
//     path: '/',
//     name: 'index',
//     redirect: { name: 'mainlayout' },
//     component: 'index',
//     children: [{
//             meta: { title: '后台首页' },
//             component: 'home/index'
//         },
//         {
//             meta: { title: '商品列表' },
//             component: 'shop/goods/list'
//         },
//         {
//             meta: { title: '模板设置' },
//             component: 'template/set'
//         }
//     ]
// }, {
//     component: 'login/index'
// }, {
//     path: '*',
//     redirect: { name: 'mainlayout' }
// }]



// // 获取路由信息方法
// let getRouter = function() {
//     // 自动生成路由
//     createRoute(routes)
//     return routes
// }

// // 自动生成路由
// function createRoute(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         if (!arr[i].component) return
//             // 去除index
//         let val = getValue(arr[i].component)
//             // 生成name
//         arr[i].name = arr[i].name || val.replace(/\//g, '_')
//             // 生成path
//         arr[i].path = arr[i].path || `/${val}`
//             // 自动生成component
//         let componentFun =
//             import (`../../views/${arr[i].component}.vue`)
//         arr[i].component = () => componentFun
//         if (arr[i].children && arr[i].children.length > 0) {
//             createRoute(arr[i].children)
//         }
//     }
// }

// // 去除index
// function getValue(str) {
//     // 获取最后一个索引
//     let index = str.lastIndexOf('/')
//         // 获取最后一个反斜杠后面的值
//     let val = str.substring(index + 1, str.length)
//         // 判断是不是index结尾
//     if (val === 'index') {
//         return str.substring(index, -1)
//     }
//     return str
// }

// export default getRouter()
export default routes
