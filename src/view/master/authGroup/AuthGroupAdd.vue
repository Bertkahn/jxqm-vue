<template>
    <el-dialog title="添加" :visible.sync="show" @open="open" :before-close="close" top="12vh" width="600px">
        <el-form class="el-form-add" ref="form" :model="form" label-width="110px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.authType" @change="getAuthList" filterable placeholder="请选择">
                    <el-option label="超级管理" :value="1"></el-option>
                    <el-option label="集团管理" :value="2"></el-option>
                    <el-option label="公司管理" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限">
                <div v-if="form.authType == 1" style="text-align: center">超级权限</div>
                <el-form-item v-for="(auth, index) in authList" :key="index" :label="auth.name + '：'">
                    <el-checkbox-group v-model="auth.checkList">
                        <el-checkbox :disabled="!auth.num || auth.num % 1 != 0" :checked="checked" @change="checked=!checked" :label="1">查看</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 2 != 0" :checked="checked" @change="checked=!checked" :label="2">添加</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 3 != 0" :checked="checked" @change="checked=!checked" :label="3">编辑</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 5 != 0" :checked="checked" @change="checked=!checked" :label="5" >删除</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <div v-if="platAuthList.length" style="text-align: center">集团权限</div>
                <el-form-item v-for="(auth, index) in platAuthList" :key="'plat' + index" :label="auth.name + '：'">
                    <el-checkbox-group v-model="auth.checkList">
                        <el-checkbox :disabled="!auth.num || auth.num % 1 != 0" :checked="checked" @change="checked=!checked" :label="1">查看</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 2 != 0" :checked="checked" @change="checked=!checked" :label="2">添加</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 3 != 0" :checked="checked" @change="checked=!checked" :label="3">编辑</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 5 != 0" :checked="checked" @change="checked=!checked" :label="5" >删除</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <div v-if="instAuthList.length" style="text-align: center">公司权限</div>
                <el-form-item v-for="(auth, index) in instAuthList" :key="'inst' + index" :label="auth.name + '：'">
                    <el-checkbox-group v-model="auth.checkList">
                        <el-checkbox :disabled="!auth.num || auth.num % 1 != 0" :checked="checked" @change="checked=!checked" :label="1">查看</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 2 != 0" :checked="checked" @change="checked=!checked" :label="2">添加</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 3 != 0" :checked="checked" @change="checked=!checked" :label="3">编辑</el-checkbox>
                        <el-checkbox :disabled="!auth.num || auth.num % 5 != 0" :checked="checked" @change="checked=!checked" :label="5" >删除</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
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
    export default {
        data() {
            return {
                // element bug，无其他用处
                checked: false,
                form: {
                },
                authList: [],
                platAuthList: [],
                instAuthList: []
            }
        },
        methods: {
            open () {
                this.form = {};
                this.checked = false;
            },
            close () {
                if (this.callBack) {
                    this.callBack(false);
                }
            },
            postUrl (value, callback) {
                Sun.post({
                    url: this.url.getChooseAuthList,
                    data: {authType: value},
                    success: (data) => {
                        data.forEach((item) => {
                            item.checkList = [];
                        });
                        if (callback) {
                            callback (data);
                        }
                    }
                })
            },
            getAuthList (value) {
                if (!value) {
                    return;
                }
                this.authList = [];
                this.platAuthList = [];
                this.instAuthList = [];
                this.postUrl(value, (data) => {
                    this.authList = data;
                });
                if (value == 1) {
                    this.postUrl(2, (data) => {
                        this.platAuthList = data;
                    });
                }
            },
            submit() {
                if (!this.form.name) {
                    Sun.showError('请输入名称');
                    return;
                }
                if (!this.form.authType) {
                    Sun.showError('请选择类型');
                    return;
                }
                let rules = '';
                this.authList.forEach((auth) => {
                    if (auth.checkList.length) {
                        let num = 1;
                        auth.checkList.forEach((item) => {
                            num *= item;
                        });
                        if (rules == '')
                            rules = auth.alias + num;
                        else
                            rules = rules + ',' + auth.alias + num;
                    }
                });
                this.platAuthList.forEach((auth) => {
                    if (auth.checkList.length) {
                        let num = 1;
                        auth.checkList.forEach((item) => {
                            num *= item;
                        });
                        if (rules == '')
                            rules = auth.alias + num;
                        else
                            rules = rules + ',' + auth.alias + num;
                    }
                });
                this.instAuthList.forEach((auth) => {
                    if (auth.checkList.length) {
                        let num = 1;
                        auth.checkList.forEach((item) => {
                            num *= item;
                        });
                        if (rules == '')
                            rules = auth.alias + num;
                        else
                            rules = rules + ',' + auth.alias + num;
                    }
                });
                if (!rules) {
                    Sun.showError('请选择权限');
                    return;
                }
                this.form.rules = rules;
                Sun.post({
                    url: this.url.add,
                    data: this.form,
                    success: () => {
                        if (this.callBack) {
                            this.callBack(true);
                        }
                    }
                });
            }
        },
        props: ['url', 'show', 'callBack'],
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
