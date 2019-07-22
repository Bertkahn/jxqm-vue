<template>
    <el-dialog title="图片列表" :visible.sync="show" :before-close="close" top="12vh" width="800px">
        <div class="box">
            <a v-for="(item, index) in imgList" target="_blank" :href="item.img">
                <img :src="item.img"/>
            </a>
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
            close () {
                if (this.callBack) {
                    this.callBack(false);
                }
            },
        },
        props: ['show', 'imgList', 'callBack'],
    }
</script>

<style scoped>
    .box {
        display: flex;
    }
    a img {
        width: 200px;
        margin-left: 30px;
        cursor: pointer;
    }
</style>

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
