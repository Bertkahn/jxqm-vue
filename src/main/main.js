import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../../static/css/icon.css';
import "babel-polyfill";
// ueditor
import '../../static/ueditor/ueditor.config.js'
// import '../../static/ueditor/ueditor.all.min.js'
import '../../static/ueditor/ueditor.all.js'
import '../../static/ueditor/lang/zh-cn/zh-cn.js'
import '../../static/ueditor/ueditor.parse.min.js'
// 插入组件
import install from './install';
install(Vue);

// lazy-load
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad);

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

// vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
    key: '365a60ec048a69e7d39b8e25510e2859',
    plugin: ['AMap.Geolocation', 'AMap.Geocoder']
});

let isInit = false;
router.beforeEach((to, from, next) => {
    if (!isInit && Sun.init) {
        Sun.init(to, from, next);
        isInit = true;
    } else {
        next();
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
