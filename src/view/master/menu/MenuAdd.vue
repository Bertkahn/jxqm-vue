<template>
    <div>
        <el-dialog title="添加" :visible.sync="show" @open="open" :before-close="close" top="12vh" width="600px">
            <el-form class="el-form-add" ref="form" :model="form" label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="路径">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <el-button type="primary" @click="iconVisible = true">选择图标</el-button>
                    <i style="font-size: 30px;vertical-align: middle;margin-left: 10px" :class="form.icon"></i>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.authType" @change="getMenuList" filterable placeholder="请选择">
                        <el-option label="超级管理" :value="1"></el-option>
                        <el-option label="集团管理" :value="2"></el-option>
                        <el-option label="公司管理" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="父级">
                    <el-select v-model="form.pid" filterable clearable placeholder="请选择">
                        <el-option v-for="(item, index) in menuList" :key="index" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div class="el-line-add"></div>
                <el-button class="el-button-add" type="primary" @click="submit()">提交</el-button>
                <el-button class="el-button-add" @click="close">取消</el-button>
            </div>
        </el-dialog>
        <!-- icon -->
        <el-dialog title="Icon" :visible.sync="iconVisible" width="500px" style="">
            <el-button type="primary" @click="form.icon = '';iconVisible = false;">取消</el-button>
            <div style="display: flex;flex-wrap: wrap;justify-content: flex-start">
                <div style="font-size: 40px;margin-left: 10px;margin-bottom: 10px;cursor: pointer" @click="form.icon = 'el-icon-lx-' + item;iconVisible = false;" :class="`el-icon-lx-${item}`" v-for="(item,index) in iconList" :key="index"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                iconVisible: false,
                iconList: ['attentionforbid', 'attentionforbidfill', 'attention', 'attentionfill', 'tag', 'tagfill', 'people', 'peoplefill', 'notice', 'noticefill', 'mobile', 'mobilefill', 'voice', 'voicefill', 'unlock', 'lock', 'home', 'homefill', 'delete', 'deletefill', 'notification', 'notificationfill', 'notificationforbidfill', 'like', 'likefill', 'comment', 'commentfill', 'camera', 'camerafill', 'warn', 'warnfill', 'time', 'timefill', 'location', 'locationfill', 'favor', 'favorfill', 'skin', 'skinfill', 'news', 'newsfill', 'record', 'recordfill', 'emoji', 'emojifill', 'message', 'messagefill', 'goods', 'goodsfill', 'crown', 'crownfill', 'move', 'add', 'hot', 'hotfill', 'service', 'servicefill', 'present', 'presentfill', 'pic', 'picfill', 'rank', 'rankfill', 'male', 'female', 'down', 'top', 'recharge', 'rechargefill', 'forward', 'forwardfill', 'info', 'infofill', 'redpacket', 'redpacket_fill', 'roundadd', 'roundaddfill', 'friendadd', 'friendaddfill', 'cart', 'cartfill', 'more', 'moreandroid', 'back', 'right', 'shop', 'shopfill', 'question', 'questionfill', 'roundclose', 'roundclosefill', 'roundcheck', 'roundcheckfill', 'global', 'mail', 'punch', 'exit', 'upload', 'read', 'file', 'link', 'full', 'group', 'friend', 'profile', 'addressbook', 'calendar', 'text', 'copy', 'share', 'wifi', 'vipcard', 'weibo', 'remind', 'refresh', 'filter', 'settings', 'scan', 'qrcode', 'cascades', 'apps', 'sort', 'searchlist', 'search', 'edit'],
                form: {
                },
                menuList: []
            }
        },
        methods: {
            open () {
                this.form = {}
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
                    url: Http.master.getSelectMenuTreeList,
                    data: {authType: value},
                    success: (data) => {
                        this.menuList = data;
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
                    url: Http.master.addMenu,
                    data: this.form,
                    success: () => {
                        if (this.callBack) {
                            this.callBack(true);
                        }
                    }
                });
            }
        },
        props: ['show', 'callBack'],
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
