const mainColor = '#E85352';
export default {
    //
    userKey: 'adminData',
    // http: 'http://pre-api_a.globmate.com',
    http: '../',
    // 初始化
    init (a, b, c, d) {
        if (a.path == this.loginPath || Sun.isLogin) {
            c();
        } else {
            c(this.loginPath);
        }
    },
    // 处理url
    formatUrl: function (url, data) {
        return url;
    },
    // 处理data
    formatData: null,
    // 处理header
    formatHeader (header) {
        if (!header)
            header = {
                "Content-Type": 'application/json; charset=UTF-8'
            };
        if (Sun.isLogin) {
            header.token = Sun.user.token;
        }
        return header;
    },
    oss_http: 'https://globmate.oss-cn-hangzhou.aliyuncs.com/',
    api: '',
    loginPath: '/login',
    timeout: 20 * 1000,
    successCode: 0,
    noAuthCode: 9995,
    err_login_code: [1,2,3,4,5,6,7,8,9],
    oss_config: {
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAIpBWuBuQ9taMw',
        accessKeySecret: 'm7sjHKi9sVtlBTF5lGpQMUqZfBCa1D',
        bucket: 'globmate'
    }
}
