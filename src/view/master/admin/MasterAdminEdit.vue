<template>
    <el-dialog title="添加" :visible.sync="show" @open="open" :before-close="close" top="12vh" width="600px">
        <el-form class="el-form-add" ref="form" :model="form" label-width="100px">
            <el-form-item label="真实姓名">
                <el-input v-model="form.trueName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="初始密码">
                <el-input v-model="form.password" placeholder="不填则不修改密码"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="离职" :value="2"></el-option>
                    <el-option label="关闭" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限组">
                <el-select v-model="form.groupId" filterable placeholder="请选择">
                    <el-option v-for="(item, index) in groupList" :key="index" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div class="el-line-add"></div>
            <el-button class="el-button-add" type="primary" @click="submit()">提交</el-button>
            <el-button class="el-button-add" @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {copyMap} from "../../../js/util";

    export default {
        data() {
            return {
                form: {},
                groupList: []
            }
        },
        methods: {
            open () {
                this.form = copyMap(this.data);
                if (this.form.groupId == 1)
                    this.form.groupId = 0;
                Sun.post({
                    url: this.url.getAuthGroupList,
                    success: (data) => {
                        this.groupList = data;
                        this.groupList.unshift({id: 0, name: '无'});
                    }
                });
            },
            close () {
                if (this.callBack) {
                    this.callBack(false);
                }
            },
            submit() {
                if (!this.form.trueName) {
                    Sun.showError('请输入真实姓名');
                    return;
                }
                if (!this.form.phone || this.form.phone.length != 11) {
                    Sun.showError('请输入手机号');
                    return;
                }
                if (this.form.password && (this.form.password.length < 6 || this.form.password.length > 16)) {
                    Sun.showError('请输入6-16位密码');
                    return;
                }
                Sun.post({
                    url: this.url.edit,
                    data: this.form,
                    success: () => {
                        if (this.callBack) {
                            this.callBack(true);
                        }
                    }
                });
            }
        },
        props: ['data', 'url', 'show', 'callBack'],
    }
</script>

<style>
    .dialog-footer {
        clear: both;
        height: 30px;
    }

    .el-line-add {
        width: 100%;
        height: 1px;
        background-color: #dedede;
    }

    .el-form-add {
        max-height: 400px !important;
        overflow: scroll
    }

    .el-button-add {
        float: right;
        margin-right: 10px;
        margin-top: 10px;
    }
</style>
