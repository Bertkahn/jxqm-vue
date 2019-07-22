export default [
    {
        path: '/',
        redirect: '/welcome'
    },
    {
        path: '/login',
        component: resolve => require(['../view/login/Login.vue'], resolve)
    },
    {
        path: '/changePwd',
        component: resolve => require(['../view/login/ChangePwd.vue'], resolve)
    },
    {
        path: '/',
        component: resolve => require(['../common/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children:[
            {
                path: '/welcome',
                component: resolve => require(['../view/Welcome.vue'], resolve),
                meta: { title: '欢迎!' }
            },
            /*********************  Common  **********************************/
            {
                // sun
                path: '/common/customer/myCustomer',
                component: resolve => require(['../view/common/customer/myCustomer/Index.vue'], resolve),
                meta: { title: '我的客户' }
            },
            /*********************  Master  **********************************/
            // todo all
            {
                path: '/master/admin/masterAdmin',
                component: resolve => require(['../view/master/admin/MasterAdmin.vue'], resolve),
                meta: { title: '超级管理员' }
            },
            {
                path: '/master/auth/auth',
                component: resolve => require(['../view/master/auth/Auth.vue'], resolve),
                meta: { title: '权限管理' }
            },
            {
                path: '/master/authGroup/authGroup',
                component: resolve => require(['../view/master/authGroup/AuthGroup.vue'], resolve),
                meta: { title: '权限组管理' }
            },
            {
                path: '/master/menu/menu',
                component: resolve => require(['../view/master/menu/Menu.vue'], resolve),
                meta: { title: '菜单管理' }
            },
            /*********************  Plat  **********************************/
            {
                // sun
                path: '/plat/activity/activity1',
                component: resolve => require(['../view/plat/activity/activity1/Index.vue'], resolve),
                meta: { title: '活动1' }
            },

            /*********************  Test  **********************************/
            {
                path: '/test',
                component: resolve => require(['../view/Test.vue'], resolve),
                meta: { title: 'hello world' }
            },
            // base
            {
                path: '/icon',
                component: resolve => require(['../view/base/Icon.vue'], resolve),
                meta: { title: 'hello world' }
            },
            {
                path: '/table',
                component: resolve => require(['../view/base/BaseTable.vue'], resolve),
                meta: { title: '基础表格' }
            },
            {
                path: '/tabs',
                component: resolve => require(['../view/base/Tabs.vue'], resolve),
                meta: { title: 'tab选项卡' }
            },
            {
                path: '/form',
                component: resolve => require(['../view/base/BaseForm.vue'], resolve),
                meta: { title: '基本表单' }
            },
            {
                // 富文本编辑器组件
                path: '/editor',
                component: resolve => require(['../view/base/VueEditor.vue'], resolve),
                meta: { title: '富文本编辑器' }
            },
            {
                // markdown组件
                path: '/markdown',
                component: resolve => require(['../view/base/Markdown.vue'], resolve),
                meta: { title: 'markdown编辑器' }
            },
            {
                // 图片上传组件
                path: '/upload',
                component: resolve => require(['../view/base/Upload.vue'], resolve),
                meta: { title: '文件上传' }
            },
            {
                // vue-schart组件
                path: '/charts',
                component: resolve => require(['../view/base/BaseCharts.vue'], resolve),
                meta: { title: 'schart图表' }
            },
            {
                // 拖拽列表组件
                path: '/drag',
                component: resolve => require(['../view/base/DragList.vue'], resolve),
                meta: { title: '拖拽列表' }
            },
            {
                // 权限页面
                path: '/permission',
                component: resolve => require(['../view/base/Permission.vue'], resolve),
                meta: { title: '权限测试', permission: true }
            },
            {
                path: '/404',
                component: resolve => require(['../view/base/404.vue'], resolve),
                meta: { title: '404' }
            },
            {
                path: '/403',
                component: resolve => require(['../view/base/403.vue'], resolve),
                meta: { title: '403' }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404'
    }
]
