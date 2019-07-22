<template>
    <Page :title="'测试'">
        <div ref="id" id="editor" style="width:100%;height:500px;"></div>
        <el-button @click="test" type="primary">test</el-button>
    </Page>
</template>

<script>
    import bus from '../common/bus';
    import setting from "../../src/config/setting";
    let co = require('co');
    let OSS = require('ali-oss');
    let client = new OSS(setting.oss_config);

    export default {
        extends: Sun.vuePage,
        name: 'adasdasd111',
        data() {
            return {
                value: '1111',
                editor: null
            }
        },
        created() {
             bus.$on('uploadImg', () => {
                this.uploadImg();
            })
        },
        activated () {
            this.value = this.editor.getContent();
            if (!this.editor){
                this.editor = window.UE.getEditor("editor");
                //设置编辑器默认内容
                this.editor.addListener('ready', () => {
                    this.editor.setContent(this.value);
                })
            }
        },
        mounted () {
            // 实例化editor编辑器
            this.editor = window.UE.getEditor("editor");
            //设置编辑器默认内容
            this.editor.addListener('ready', () => {
                this.editor.setContent(this.value);
                // 上传图片方法
                this.editor.beforeSimpleUpload = this.uploadImg;
            })
        },
        methods: {
            uploadImg (param) {
                console.log(param)
                let vue = this;
                Sun.post({
                    url: Http.getUploadPath,
                    loading: true,
                    success: (data) => {
                        let loading = Sun.showActivity();
                        co(function* () {
                            Sun.hideActivity(loading);
                            var myBlob = new Blob(param);
                            yield client.put(data, myBlob);
                            // console.log('https://globmate.oss-cn-hangzhou.aliyuncs.com/' + data);
                            return data;
                        }).catch(function (err) {
                            console.log(err)
                            Sun.hideActivity(loading);
                            Sun.showError('图片上传失败');
                        });
                    }
                });
            },
            test () {
                console.log(this.editor.getContent())
                 this.editor.setContent('this.editor.getContent()')
            },
            //获取编辑器中的内容
            getUEContent () {
                return this.editor.getContent()
            },
        },
        
        destroyed () {
            // 将editor进行销毁
            if (this.editor){
                this.editor.destroy();
            } 
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>
