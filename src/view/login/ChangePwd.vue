<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title main-color">修改密码</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="ms-content">
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        extends: Sun.vuePage,
        data () {
            var validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    oldPass: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    oldPass: [
                        { validator: validatePass1, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        Sun.post({
                            url: Http.common.changePassword,
                            loading: true,
                            data: {password: this.ruleForm.oldPass, newPassword: this.ruleForm.pass},
                            success: (data) => {
                                Sun.setLogin(data);
                                Sun.push('/');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/config";
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/login_bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;

        line-height: 50px;
        text-align: center;
        font-size:20px;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
