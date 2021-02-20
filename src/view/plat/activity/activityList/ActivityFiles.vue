<template>
    <el-dialog title="资料详情" :visible.sync="show" :before-close="close" top="12vh" width="1000px">
        <el-dialog width="50%" title="文件添加" :visible.sync="addFiles" append-to-body >
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="名称">
                    <el-input size="small" v-model="form.name" placeholder="请输入名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="1" name="type">图片</el-radio>
                        <el-radio label="2" name="type">音频</el-radio>
                        <el-radio label="3" name="type">视频</el-radio>
                        <el-radio label="4" name="type">文字</el-radio>
                        <el-radio label="5" name="type">文档</el-radio>
                        <el-radio label="6" name="type">pdf文件</el-radio>
                        <el-radio label="0" name="type">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input size="small" v-model="form.url" placeholder="请输入地址" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即上传</el-button>
                    <el-button @click="addFiles = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-button type="primary" @click="addFiles = true">上传</el-button>
        <table border="0" cellspacing="1">
            <tr>
                <th>名称</th>
                <th>类型</th>
                <th>地址</th>
                <th>上传时间</th>
            </tr>
            <tr v-for="(item, index) in fileList" :key="index">
                <td>{{item.name}}</td>
<!--                <td>{{item.activityId}}</td>-->
                <td>{{item.type | formatType}}</td>
                <td><a target="_blank" :href="item.url">{{item.url}}</a></td>
                <td>{{item.createTime | formatTime}}</td>
            </tr>
        </table>
    </el-dialog>

</template>

<script>
    const url = {
        edit: Http.plat.editActivityFiles,
        insert: Http.plat.insertActivityFiles,
    };
    import {formatTime} from "../../../../js/util";
    export default {
        data() {
            return {
                form: {
                    name: '',
                    type: '',
                    url: ''
                },
                addFiles: false,
            }
        },
        methods: {
            onSubmit(){
                console.log(this.activityId)
                Sun.post({
                    url: url.insert,
                    data: {
                        name: this.form.name,
                        type: this.form.type,
                        url: this.form.url,
                        activityId: this.activityId
                    },
                    success: () => {
                        Sun.showMsg('上传成功');
                        this.addFiles = false;
                        this.callBack(this.activityId);
                    }
                });
            },
            close () {
                if (this.callBack) {
                    this.callBack(false);
                }
            },
        },
        filters: {
            formatTime (day) {
                return formatTime(day);
            },
            formatType (type){
                if (type == 0) {
                    return '其他';
                }
                if (type == 1) {
                    return '图片';
                }
                if (type == 2) {
                    return '音频';
                }
                if (type == 3) {
                    return '视频';
                }
                if (type == 4) {
                    return '文字';
                }
                if (type == 5) {
                    return '文档';
                }
                if (type == 6) {
                    return 'pdf文件';
                }
            }
        },
        props: ['show', 'activityId', 'fileList', 'callBack'],
    }
</script>

<style scoped>
    table {
        width: 100%;
        text-align: center;
        background-color: #dedede;

    }
    td, th {
        word-break: break-all;
        background-color: white;
        padding: 10px 20px;
    }
</style>
