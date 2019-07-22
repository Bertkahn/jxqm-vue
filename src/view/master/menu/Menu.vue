<template>
    <Page>
        <!--table-->
        <SunTable :load="(that) => { table.el = that }" :data="table.data">
            <el-button v-show="auth.add" @click="showAdd = true" type="primary">添加菜单</el-button>
            <div slot="name" slot-scope="data" >{{data.row._prefix + data.row.name}}</div>
            <div slot="icon" slot-scope="data"><i :class="data.row.icon"></i></div>
            <div slot="authType" slot-scope="data" >{{data.row.authType | formatAuthType}}</div>
            <div slot="opreate" slot-scope="data">
                <el-button v-show="auth.edit" type="text" size="mini" @click="edit(data.row)">编辑</el-button>
                <el-button v-show="auth.del" class="opreate-del" type="text" size="mini" @click="del(data.row)">删除</el-button>
            </div>
        </SunTable>
        <!--add-->
        <MenuAdd :show="showAdd"
                       :callBack="(flag)=>{showAdd = false;if (flag) table.el.refresh()}"></MenuAdd>
        <!--edit-->
        <MenuEdit :show="showEdit" :data="editData"
                        :callBack="(flag)=>{showEdit = false;if (flag) table.el.refresh()}"></MenuEdit>
    </Page>
</template>

<script>
    import MenuAdd from './MenuAdd';
    import MenuEdit from './MenuEdit';
    export default {
        components: {MenuAdd, MenuEdit},
        extends: Sun.vuePage,
        data() {
            return {
                auth: {
                    add: true,
                    edit: true,
                    del: true
                },
                showAdd: false,
                showEdit: false,
                editData: {},
                table: {
                    el: null,
                    data: {
                        url: Http.master.getMenuTreeList,
                        isPage: false,
                        filterList: [{key: 'authType', symbol: '=', value: 1}],
                        list: [
                            {
                                title: '名称',
                                key: 'name',
                                align: 'left',
                                search:{
                                    type: 'text',
                                    symbol: 'like',
                                    cat: '%?%'
                                }
                            },
                            {
                                title: '路径',
                                key: 'path',
                                search:{
                                    type: 'text',
                                    symbol: 'like',
                                    cat: '%?%'
                                }
                            },
                            {
                                title: '图标',
                                key: 'icon'
                            },
                            {
                                title: '类型',
                                key: 'authType',
                                search:{
                                    type: 'select',
                                    symbol: '=',
                                    list: [
                                        {name: '超级管理', value: '1'},
                                        {name: '集团管理', value: '2'},
                                        {name: '公司管理', value: '3'}
                                    ]
                                },
                                filter:[
                                    {text: '超级管理', value: '= 1'},
                                    {text: '集团管理', value: '= 2'},
                                    {text: '公司管理', value: '= 3'}
                                ]
                            },
                            {
                                title: '备注',
                                key: 'remark'
                            },
                            {
                                title: '操作',
                                key: 'opreate'
                            }
                        ]
                    }
                }
            }
        },
        created () {
            Sun.checkBtnAuth(Http.master.addMenu, () => {this.auth.add = false});
            Sun.checkBtnAuth(Http.master.editMenu, () => {this.auth.edit = false});
            Sun.checkBtnAuth(Http.master.delMenu, () => {this.auth.del = false});
        },
        methods: {
            // 编辑
            edit (item) {
                this.editData = item;
                this.showEdit = true;
            },
            // 删除
            del (item) {
                Sun.confirm('提示', '确定要删除此权限吗?', () => {
                    Sun.post({
                        url: Http.master.delMenu,
                        data: {menuId: item.id},
                        loading: true,
                        success: (data) => {
                            Sun.showMsg('已删除！');
                            this.table.el.refresh();
                        }
                    });
                });
            }
        },
        filters: {
            parseName (item) {
                return item.name;
            },
            formatAuthType (type) {
                if (type == 1) {
                    return '超级管理'
                }
                if (type == 2) {
                    return '集团管理'
                }
                if (type == 3) {
                    return '公司管理'
                }
            }
        }
    }
</script>

<style scoped>
    .opreate-del {
        color: #F56C6C;
    }
</style>
