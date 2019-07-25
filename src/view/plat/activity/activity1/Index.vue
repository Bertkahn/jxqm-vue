<template>
    <Page>
        <!--table-->
        <SunTable :load="(that) => { table.el = that }" :data="table.data">
            <!--<el-button v-show="auth.add" @click="showAdd = true" type="primary">添加管理员</el-button>-->
            <div slot="status" slot-scope="data">{{data.row.status | formatStatus}}</div>
            <div slot="birthDay" slot-scope="data">{{data.row.birthDay | formatBirthDay}}</div>
            <div slot="sex" slot-scope="data">{{data.row.sex == 1 ? '男' : '女'}}</div>
            <div slot="opreate" slot-scope="data">
                <el-button type="text" size="mini" @click="look(data.row)">查看</el-button>
                <el-button v-show="auth.verify" type="text" size="mini" @click="verify(data.row, 1)">通过</el-button>
                <el-button class="opreate-del" v-show="auth.verify" type="text" size="mini" @click="verify(data.row, 2)">拒绝</el-button>
                <!--<el-button v-show="auth.del" class="opreate-del" type="text" size="mini" @click="del(data.row)">删除-->
                <!--</el-button>-->
            </div>
        </SunTable>
        <!--edit-->
        <ImgList :show="showList" :callBack="(flag)=>{showList = false;}" :imgList="imgList"></ImgList>
    </Page>
</template>

<script>
    import {formatDay} from "../../../../js/util";
    import ImgList from './ImgList';
    const url = {
        table: Http.plat.getActivity1UserPage,
        verify: Http.plat.verifyActivity1User,
        imgList: Http.plat.getActivity1UserImgList
        // edit: Http.common.editAdmin,
    };
    export default {
        components: {ImgList},
        extends: Sun.vuePage,
        data() {
            return {
                url: url.table,
                auth: {
                    verify: true
                },
                showList: false,
                imgList: [],
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
                                    symbol: 'like'
                                }
                            },
                            {
                                title: '性别',
                                key: 'sex'
                            },
                            {
                                title: '生日',
                                key: 'birthDay',
                            },
                            {
                                title: '城市',
                                key: 'city',
                                sortable: true
                            },
                            {
                                title: '状态',
                                key: 'status',
                                filter: [
                                    {text: '待审核', value: '= 0'},
                                    {text: '通过', value: '= 1'},
                                    {text: '拒绝', value: '= 2'}
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
            Sun.checkBtnAuth(url.verify, () => {this.auth.verify = false});
        },
        methods: {
            // 查看照片
            look (item) {
                Sun.post({
                    url: url.imgList,
                    data: {userId: item.userId},
                    loading: true,
                    success: (data) => {
                        this.imgList = data;
                        this.showList = true;
                    }
                });
            },
            // 审核
            verify (item, status) {
                Sun.post({
                    url: url.verify,
                    data: {status: status, id: item.id},
                    loading: true,
                    success: () => {
                        Sun.showMsg('处理成功');
                        this.table.el.refresh();
                    }
                })
            }
        },
        filters: {
            formatStatus (status) {
                if (status == 1) {
                    return '通过';
                }
                if (status == 2) {
                    return '拒绝';
                }
                return '待审核';
            },
            // formatBirthDay (birthDay) {
            //     if (birthDay == 719) {
            //         return birthDay.substr(0,1)+'-'+birthDay.substr(1,3);
            //     }
            //     if (birthDay.toString().length == 4) {
            //         return birthDay.substr(0,2)+'-'+birthDay.substr(2,4);
            //     }
            // },
        },

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
