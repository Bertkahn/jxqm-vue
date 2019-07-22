<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import '../config/http';
import '../config/static';
import '../js/sun';
export default {
    name: 'App',
    created () {
        Sun.app = this;
    }
}
</script>
<style lang="less">
    @import "../../static/css/main.css";
    @import "../../static/css/color-dark.css";     /*深色主题*/

    @import "../assets/css/config.less";
    @import "../assets/css/sun.less";
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>
