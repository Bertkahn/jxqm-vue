<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in menuList">
                <template v-if="item.childlist.length">
                    <el-submenu :index="item.path ? item.path : Math.random() + ''" :key="item.path ? item.path : Math.random()">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.childlist">
                            <el-submenu v-if="subItem.childlist.length" :index="subItem.path ? subItem.path : Math.random() + ''" :key="subItem.path ? subItem.path : Math.random()">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.childlist" :key="i" :index="threeItem.path ? threeItem.path : Math.random() + ''">
                                    {{ threeItem.name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.path ? subItem.path : Math.random() + ''" :key="subItem.path ? subItem.path : Math.random()">
                                {{ subItem.name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path ? item.path : Math.random() + ''" :key="item.path">
                        <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                menuList: [
                    /*********************  Master  **********************************/
                    {
                        icon: 'el-icon-lx-home',
                        path: 'welcome',
                        name: '欢迎!',
                        childlist:[]
                    }
                    // {
                    //     icon: 'el-icon-lx-cascades',
                    //     path: 'table',
                    //     name: '基础表格',
                    //     childlist:[]
                    // },
                    // {
                    //     icon: 'el-icon-lx-copy',
                    //     path: 'tabs',
                    //     name: 'tab选项卡',
                    //     childlist:[]
                    // },
                    // {
                    //     icon: 'el-icon-lx-calendar',
                    //     path: '3',
                    //     name: '表单相关',
                    //     childlist: [
                    //         {
                    //             path: 'form',
                    //             name: '基本表单',
                    //             childlist:[]
                    //         },
                    //         {
                    //             path: '3-2',
                    //             name: '三级菜单',
                    //             childlist: [
                    //                 {
                    //                     path: 'editor',
                    //                     name: '富文本编辑器',
                    //                     childlist:[]
                    //                 },
                    //                 {
                    //                     path: 'markdown',
                    //                     name: 'markdown编辑器',
                    //                     childlist:[]
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             path: 'upload',
                    //             name: '文件上传',
                    //             childlist:[]
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-lx-emoji',
                    //     path: 'icon',
                    //     name: '自定义图标',
                    //     childlist:[]
                    // },
                    // {
                    //     icon: 'el-icon-lx-favor',
                    //     path: 'charts',
                    //     name: 'schart图表',
                    //     childlist:[]
                    // },
                    // {
                    //     icon: 'el-icon-rank',
                    //     path: 'drag',
                    //     name: '拖拽列表',
                    //     childlist:[]
                    // },
                    // {
                    //     icon: 'el-icon-lx-warn',
                    //     path: '6',
                    //     name: '错误处理',
                    //     childlist: [
                    //         {
                    //             path: 'permission',
                    //             name: '权限测试',
                    //             childlist:[]
                    //         },
                    //         {
                    //             path: '404',
                    //             name: '404页面',
                    //             childlist:[]
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                // return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            Sun.post({
                url: Http.common.getMenu,
                loading: true,
                success: (data) => {
                    this.menuList = data;
                    this.menuList.unshift({
                        icon: 'el-icon-lx-home',
                        path: 'welcome',
                        name: '欢迎!',
                        childlist:[]
                    });
                }
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
