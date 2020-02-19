let routes = [{
        path: '/',
        redirect: '/dashboard'
    },

    {
        path: '/',
        component: () =>
            import ('@/views/home/index.vue'),
        meta: { title: '自述文件' },
        children: [{
                path: '/dashboard',
                component: () =>
                    import ('@/views/dashboard/Dashboard.vue'),
                meta: { title: '系统首页' }
            },
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
                path: '/messageshow',
                component: () =>
                    import ('@/views/message/Message.vue'),
                meta: { title: '提醒消息' }
            },
            {
                path: '/templateset',
                component: () =>
                    import ('@/views/template/set.vue'),
                meta: { title: '模板设置' }
            },
            {
                path: '/test',
                component: () =>
                    import ('@/views/template/test.vue'),
                meta: { title: '测试' }
            },
            {
                path: '/test2',
                component: () =>
                    import ('@/views/template/test2.vue'),
                meta: { title: '测试2' }
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
    {
        path: '*',
        redirect: '/404'
    }
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