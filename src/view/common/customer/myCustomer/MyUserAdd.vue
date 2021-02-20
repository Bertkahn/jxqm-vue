<template>
    <el-dialog title="添加" :visible.sync="show" @open="open" :before-close="close" top="12vh" width="600px">
        <el-form class="el-form-add" ref="form" :model="form" label-width="100px">
            <el-form-item label="用户昵称">
                <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="form.trueName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.sex" filterable placeholder="请选择">
                    <el-option label="女" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
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
    export default {
        data() {
            return {
                form: {},
                groupList: []
            }
        },
        methods: {
            open () {
                this.form = {
                }
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
                if (!this.form.phone || this.form.phone.length !== 11) {
                    Sun.showError('请输入手机号');
                    return;
                }
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
