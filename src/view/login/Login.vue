<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title main-color">后台管理</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.account" placeholder="请输入手机号或工号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-checkbox v-model="checked" style="color: #535863; margin-bottom: 10px;">记住账号</el-checkbox>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips"></p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        extends: Sun.vuePage,
        data () {
            return {
                checked: true,
                user: null,
                ruleForm: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            let account = Sun.readData('adminAccount');
            if (account) {
                this.ruleForm.account = account;
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.checked) {
                            Sun.saveData('adminAccount', this.ruleForm.account);
                        } else {
                            if (Sun.readData('adminAccount')) {
                                Sun.deleteData('adminAccount');
                            }
                        }
                        Sun.post({
                            url: Http.common.login,
                            data: this.ruleForm,
                            success: (data) => {
                                Sun.setLogin(data);
                                if (data.resetPassword == 1) {
                                    Sun.push('/changePwd');
                                } else {
                                    Sun.push('/');
                                }
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
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


    .cell {
        /*width: 100%;*/
        cursor: pointer;
        padding-left: 10px;
        height: 36px;
        line-height: 36px;
    }
    .cell:hover {
        background-color: @white-touch-color;
    }
</style>
