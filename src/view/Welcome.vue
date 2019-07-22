<template>
    <div class="all">
        <img class="logo" :src="logo" alt="">
        <p class="title">欢迎来到愫美科技!</p>
    </div>
</template>

<script>
    import img_logo from '../assets/logo.png';
    export default {
        name: 'welcome',
        data() {
            return {
                logo: img_logo
            }
        },
        computed: {

        },
        created(){

        },
        activated(){
        },
        deactivated(){
        },
        methods: {

        }
    }

</script>


<style scoped>
    .all {
        width: 100%;
        height: 100%;
        background: #fff;
        text-align: center;
    }
    .all .logo {
        width: 214px;
        height: 214px;
        margin: 0 auto;
        margin-top: 124px;
        margin-bottom: 4px;
    }
    .all .title {
        width: 100%;
        text-align: center;
        height: 214px;
        font-size: 48px;
        color:#999999;
        line-height: 67px;
        font-family:PingFangSC-Regular;
    }
</style>
