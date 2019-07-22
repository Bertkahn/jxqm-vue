/*
encodeData

 */

import detail from './sun-detail';

global.Sun = {
    // app
    app: null,
    // data
    isLogin: false,
    user: {},
    temp: {},// user
    // vue-parent
    vue: null,
    vuePage: detail.vuePage,
    // system
    system: {
        denyTouch: null, // 动画时禁止点击
        updateNavbar: null,
        updateTabbar: null,
        destroyVue: null,
        refreshVue: null
    },
    // methods
    checkBtnAuth (url, callback) {
        return detail.checkBtnAuth(url, callback);
    },
    setLogin(user) {
        return detail.setLogin(user)
    },
    logout() {
        return detail.logout()
    },
    checkLogin(needReplace) {
        return detail.checkLogin(needReplace)
    },
    // router
    closeAllPage() {
    },
    closePage(index) {
    },
    getQuery(key) {
        return detail.getQuery(key)
    },
    push(path, param) {
        return detail.push(path, param)
    },
    // show
    showActivity() {
        return detail.showActivity()
    },
    hideActivity(loading) {
        return detail.hideActivity(loading)
    },
    showError(text) {
        return detail.showError(text)
    },
    showMsg(text) {
        return detail.showMsg(text)
    },
    confirm(title, content, confirm, cancel) {
        return detail.confirm(title, content, confirm, cancel)
    },
    // app
    parseImg(img, option) {
        return detail.parseImg(img, option)
    },
    saveData(key, value) {
        return detail.saveData(key, value)
    },
    readData(key) {
        return detail.readData(key)
    },
    deleteData(key) {
        return detail.deleteData(key)
    },
    post(param) {
        return detail.post(param)
    },
    get(param) {
        return detail.get(param)
    },
    //
    init(to, from, next) {
        return detail.init(to, from, next)
    },
};
