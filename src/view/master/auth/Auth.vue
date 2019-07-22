<template>
    <Page>
        <!--table-->
        <SunTable :load="(that) => { table.el = that }" :data="table.data">
            <el-button v-show="auth.add" @click="showAdd = true" type="primary">添加权限</el-button>
            <div slot="authType" slot-scope="data">{{data.row.authType | formatAuthType}}</div>
            <div slot="opreate" slot-scope="data">
                <el-button v-show="auth.edit" type="text" size="mini" @click="edit(data.row)">编辑</el-button>
                <el-button v-show="auth.del" class="opreate-del" type="text" size="mini" @click="del(data.row)">删除</el-button>
            </div>
        </SunTable>
        <!--add-->
        <AuthAdd :url="url" :show="showAdd"
                       :callBack="(flag)=>{showAdd = false;if (flag) table.el.refresh()}"></AuthAdd>
        <!--edit-->
        <AuthEdit :url="url" :show="showEdit" :data="editData"
                        :callBack="(flag)=>{showEdit = false;if (flag) table.el.refresh()}"></AuthEdit>
    </Page>
</template>

<script>
    import AuthAdd from './AuthAdd';
    import AuthEdit from './AuthEdit';
    const url = {
        table: Http.master.getAuthPage,
        add: Http.master.addAuth,
        edit: Http.master.editAuth,
        del: Http.master.delAuth,
        getMenuListByAuth: Http.master.getMenuListByAuth
    };
    export default {
        components: {AuthAdd, AuthEdit},
        extends: Sun.vuePage,
        data() {
            return {
                url: url,
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
                        url: url.table,
                        isPage: true,
                        list: [
                            {
                                title: 'alias',
                                key: 'alias',
                                search:{
                                    type: 'text',
                                    symbol: '='
                                }
                            },
                            {
                                title: '名称',
                                key: 'name',
                                search:{
                                    type: 'text',
                                    symbol: 'like',
                                    cat: '%?%'
                                }
                            },
                            {
                                title: '菜单',
                                key: 'menuName',
                                search:{
                                    type: 'text',
                                    symbol: 'like',
                                    cat: '%?%'
                                }
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
                                title: '操作',
                                key: 'opreate'
                            }
                        ]
                    }
                }
            }
        },
        created () {
            Sun.checkBtnAuth(url.add, () => {this.auth.add = false});
            Sun.checkBtnAuth(url.edit, () => {this.auth.edit = false});
            Sun.checkBtnAuth(url.del, () => {this.auth.del = false});
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
                        url: url.del,
                        data: {authId: item.id},
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
