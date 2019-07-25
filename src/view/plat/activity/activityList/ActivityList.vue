<template>
    <Page>
        <!--table-->
        <SunTable :load="(that) => { table.el = that }" :data="table.data">
            <!--<el-button v-show="auth.add" @click="showAdd = true" type="primary">添加管理员</el-button>-->
            <div slot="type" slot-scope="data">{{'活动' + data.row.type}}</div>
            <div slot="status" slot-scope="data">{{data.row.status | formatStatus}}</div>
            <div slot="startTime" slot-scope="data">{{data.row.startTime | formatDay}}</div>
            <div slot="endTime" slot-scope="data">{{data.row.endTime | formatDay}}</div>
            <div slot="opreate" slot-scope="data">
                <el-button type="text" size="mini" @click="infomation(data.row)">资料</el-button>
                <el-button type="text" size="mini" @click="look(data.row)">查看</el-button>
<!--                <el-button v-show="auth.verify" type="text" size="mini" @click="verify(data.row, 1)">通过</el-button>-->
<!--                <el-button class="opreate-del" v-show="auth.verify" type="text" size="mini" @click="verify(data.row, 2)">拒绝</el-button>-->
                <!--<el-button v-show="auth.del" class="opreate-del" type="text" size="mini" @click="del(data.row)">删除-->
                <!--</el-button>-->
            </div>
        </SunTable>
        <!--edit-->
        <activityInfomation :show="showList" :callBack="(flag)=>{showList = false;}" :activityInfomation="activityInfomation"></activityInfomation>
    </Page>
</template>

<script>
    import {formatDay} from "../../../../js/util";
    import ActivityInfomation from './ActivityInfomation';
    const url = {
        table: Http.plat.getActivityPage,
        activityInfomation: Http.plat.getActivityFiles
    };
    export default {
        extends: Sun.vuePage,
        data() {
            return {
                url: url.table,
                showList: false,
                activityInfomation: [],
                table: {
                    el: null,
                    data: {
                        url: url.table,
                        isPage: true,
                        list: [
                            {
                                title: '机构名称',
                                key: 'instName'
                            },
                            {
                                title: '活动类型',
                                key: 'type'
                            },
                            {
                                title: '活动名称',
                                key: 'name',
                                search:{
                                    type: 'text',
                                    symbol: 'like'
                                }
                            },
                            {
                                title: '描述',
                                key: 'description',
                            },
                            {
                                title: '状态',
                                key: 'status',
                                filter: [
                                    {text: '未启用', value: '= 0'},
                                    {text: '未开始', value: '= 1'},
                                    {text: '正常', value: '= 2'},
                                    {text: '结束', value: '= 3'},
                                    {text: '主动关闭', value: '= 4'}
                                ]
                            },
                            {
                                title: '开始时间',
                                key: 'startTime',
                                sortable: true,
                                search:{
                                    type: 'time',
                                    symbol: 'between'
                                }
                            },
                            {
                                title: '结束时间',
                                key: 'endTime',
                                sortable: true,
                                search:{
                                    type: 'time',
                                    symbol: 'between'
                                }
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
        methods: {
            // 查看参与活动人员
            look () {
                Sun.push('/plat/activity/activity1');
            },
            infomation (Data){
                Sun.post({
                    url: url.activityInfomation,
                    data: {activityId: '1'},
                    loading: true,
                    success: (data) => {
                        this.activityInfomation = data;
                        this.showList = true;
                    }
                });
            },
        },
        filters: {
            formatDay (day) {
                return formatDay(day);
            },
            formatStatus (status) {
                if (status == 0) {
                    return '未启用';
                }
                if (status == 1) {
                    return '未开始';
                }
                if (status == 2) {
                    return '正常';
                }
                if (status == 3) {
                    return '结束';
                }
                if (status == 4) {
                    return '主动关闭';
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
