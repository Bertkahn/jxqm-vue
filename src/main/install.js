export default function install (Vue) {
    // component
    Vue.component('Pic', resolve => require(['../common/Pic.vue'], resolve));
    Vue.component('Page', resolve => require(['../common/Page.vue'], resolve));
    Vue.component('SunTable', resolve => require(['../common/SunTable.vue'], resolve));
}
