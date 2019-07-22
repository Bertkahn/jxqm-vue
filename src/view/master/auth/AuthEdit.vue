<template>
    <el-dialog title="编辑" :visible.sync="show" @open="open" :before-close="close" top="12vh" width="600px">
        <el-form class="el-form-add" ref="form" :model="form" label-width="100px">
            <el-form-item label="alias">
                <el-input readonly v-model="form.alias"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.authType" disabled @change="getMenuList" filterable placeholder="请选择">
                    <el-option label="超级管理" :value="1"></el-option>
                    <el-option label="集团管理" :value="2"></el-option>
                    <el-option label="公司管理" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单">
                <el-select v-model="form.menuId" filterable clearable placeholder="请选择">
                    <el-option v-for="(item, index) in menuList" :key="index" :label="item.name"
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
                form: {
                },
                menuList: [{name: '无', id: 0}]
            }
        },
        methods: {
            open () {
                this.form = copyMap(this.data);
                this.getMenuList(this.form.authType);
            },
            close () {
                if (this.callBack) {
                    this.callBack(false);
                }
            },
            getMenuList (value) {
                if (!value) {
                    return;
                }
                Sun.post({
                    url: this.url.getMenuListByAuth,
                    data: {authType: value},
                    success: (data) => {
                        this.menuList = data;
                        this.menuList.unshift({id: 0, name: '无'});
                    }
                })
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
