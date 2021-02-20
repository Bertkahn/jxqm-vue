<template>
    <Page>
        <!--table-->
        <SunTable :load="(that) => { table.el = that }" :data="table.data">
            <el-button v-show="auth.add" @click="showAdd = true" type="primary">添加管理员</el-button>
            <div slot="status" slot-scope="data">{{data.row.status | formatStatus}}</div>
            <div slot="createTime" slot-scope="data">{{data.row.createTime | formatDay}}</div>
            <div slot="opreate" slot-scope="data">
                <el-button v-show="auth.edit" type="text" size="mini" @click="edit(data.row)">编辑</el-button>
                <el-button v-show="auth.del" class="opreate-del" type="text" size="mini" @click="del(data.row)">删除
                </el-button>
            </div>
        </SunTable>
        <!--add-->
        <MasterAdminAdd :url="url" :show="showAdd"
                       :callBack="(flag)=>{showAdd = false;if (flag) table.el.refresh()}"></MasterAdminAdd>
        <!--edit-->
        <MasterAdminEdit :url="url" :show="showEdit" :data="editData"
                       :callBack="(flag)=>{showEdit = false;if (flag) table.el.refresh()}"></MasterAdminEdit>
    </Page>
</template>

<script>
    import {formatDay} from "../../../js/util";
    import MasterAdminAdd from './MasterAdminAdd';
    import MasterAdminEdit from './MasterAdminEdit';
    const url = {
        table: Http.master.getAdminPage,
        add: Http.master.addAdmin,
        edit: Http.master.editAdmin,
        del: Http.master.delAdmin,
        getAuthGroupList: Http.master.getAuthGroupList
    };
    export default {
        components: {MasterAdminAdd, MasterAdminEdit},
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
                                title: '姓名',
                                key: 'trueName',
                                search:{
                                    type: 'text',
                                    symbol: '='
                                }
                            },
                            {
                                title: '手机',
                                key: 'phone',
                                search:{
                                    type: 'text',
                                    symbol: '='
                                }
                            },
                            {
                                title: '工号',
                                key: 'workId',
                                search:{
                                    type: 'text',
                                    symbol: '='
                                }
                            },
                            {
                                title: '状态',
                                key: 'status',
                                search:{
                                    type: 'select',
                                    symbol: '=',
                                    list: [
                                        {name: '正常', value: '1'},
                                        {name: '离职', value: '2'},
                                        {name: '关闭', value: '3'}
                                    ]
                                },
                                filter:[
                                    {text: '正常', value: '= 1'},
                                    {text: '离职', value: '= 2'},
                                    {text: '关闭', value: '= 3'}
                                ]
                            },
                            {
                                title: '权限组',
                                key: 'groupName'
                            },
                            {
                                title: '注册日期',
                                key: 'createTime',
                                sortable: true
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
                Sun.confirm('提示', '确定要删除此管理员吗?', () => {
                    Sun.post({
                        url: url.del,
                        data: {adminId: item.id},
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
            formatStatus(status) {
                if (status === 1) {
                    return '正常'
                }
                if (status === 2) {
                    return '离职'
                }
                if (status === 3) {
                    return '关闭'
                }
            },
            formatDay(time) {
                if (time) {
                    return formatDay(time);
                } else {
                    return '';
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
