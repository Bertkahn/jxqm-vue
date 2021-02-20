<template>
    <Page>
        <!--table-->
        <SunTable :load="(that) => { table.el = that }" :data="table.data">
            <el-button v-show="auth.add" @click="showAdd = true" type="primary">添加会员</el-button>
            <img class="headPic" slot="headPic" slot-scope="data" :src="data.row.headPic"/>
            <div slot="createTime" slot-scope="data">{{data.row.createTime | formatDay}}</div>
            <div slot="sex" slot-scope="data">{{ data.row.sex === 1 ? '男' : '女' }}</div>
            <div slot="opreate" slot-scope="data">
                <el-button v-show="auth.edit" type="text" size="mini" @click="edit(data.row)">编辑</el-button>
                <el-button v-show="auth.del" class="opreate-del" type="text" size="mini" @click="del(data.row)">删除
                </el-button>
            </div>
        </SunTable>
        <!--add-->
        <MyUserAdd :url="url" :show="showAdd"
                        :callBack="(flag)=>{showAdd = false;if (flag) table.el.refresh()}"></MyUserAdd>
        <!--edit-->
        <MyUserEdit :url="url" :show="showEdit" :data="editData"
                       :callBack="(flag)=>{showEdit = false;if (flag) table.el.refresh()}"></MyUserEdit>
    </Page>
</template>

<script>
    import {formatDay} from "../../../../js/util";
    import MyUserAdd from './MyUserAdd';
    import MyUserEdit from './MyUserEdit';
    const url = {
        table: Http.common.getMyCustomerPage,
        add: Http.common.addMyUser,
        edit:Http.common.updateMyUser,
        del: Http.common.delMyUser,
    };
    export default {
        components: {MyUserAdd, MyUserEdit},
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
                                    symbol: 'like',
                                    cat: '%?%'
                                }
                            },
                            {
                                title: '手机',
                                key: 'phone',
                                search:{
                                    type: 'text',
                                    symbol: 'like',
                                    cat: '%?%'
                                }
                            },
                            {
                                title: '昵称',
                                key: 'nickName',
                                search:{
                                    type: 'text',
                                    symbol: 'like',
                                    cat: '%?%'
                                }
                            },
                            {
                                title: '头像',
                                key: 'headPic'
                            },
                            {
                                title: '性别',
                                key: 'sex'
                            },
                            {
                                title: '生日',
                                key: 'birthDay'
                            },
                            {
                                title: '城市',
                                key: 'city',
                                sortable: true
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
            del (item) {
                Sun.confirm('提示', '确定要删除此记录吗?', () => {
                    Sun.post({
                        url: url.del,
                        data: {id: item.id},
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
    .headPic {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .opreate-del {
        color: #F56C6C;
    }
</style>
