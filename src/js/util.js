//拷贝
export const copyMap = (map) => {let result = {};for (let key in map) {result[key] = map[key];}return result;};
export const copyList = (list) => {let result = [];list.forEach((value) => {result.push(value);});return result;};
//判断是否为数字
export const isNumber = (num) => {if(num === "" || num ==null){return false;}return !isNaN(num);};
//获取时间
export const getTime = (isFull) => {if (isFull){return new Date().getTime();}else {return Date.parse(new Date()) / 1000;}};
//时间格式
export const formatDay = (time) => {if (!time){return time;}if ((isNumber(time)?time.toString().length:time.length) === 10) {time = time * 1000;}let date = new Date(time);let year = date.getFullYear(), month = date.getMonth()+1,day = date.getDate();return year + '-' + (month < 10? '0' + month : month) + '-' + (day < 10? '0' + day : day);};
export const formatDayNotSym = (time) => {formatDay(time).replace(/-/g,"")};
export const formatDayNoYear = (time) => {if (!time){return time;}if ((isNumber(time)?time.toString().length:time.length) === 10) {time = time * 1000;}let date = new Date(time);let month = date.getMonth()+1,day = date.getDate();return (month < 10? '0' + month : month) + '-' + (day < 10? '0' + day : day);};
export const formatTime = (time) => {if (!time){return time;}if ((isNumber(time)?time.toString().length:time.length) === 10) {time = time * 1000;}let date = new Date(time);let year = date.getFullYear(), month = date.getMonth()+1,day = date.getDate(), hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();return year + '-' + (month < 10? '0' + month : month) + '-' + (day < 10? '0' + day : day) + ' ' + (hour < 10? '0' + hour : hour) + ':' + (min < 10? '0' + min : min) + ':' + (sec < 10? '0' + sec : sec);};
export const formatTimeHm = (time) => {if (!time){return time;}if ((isNumber(time)?time.toString().length:time.length) === 10) {time = time * 1000;}let date = new Date(time);let hour = date.getHours(), min = date.getMinutes();return(hour < 10? '0' + hour : hour) + ':' + (min < 10? '0' + min : min);};
//包含数组
export const containsObject = (list, item, useType) => {if (useType) {return list.indexOf(item) !== -1;} else {let result = false;list.forEach((value) => {if (value == item) {result = true;return true;}});return result;}}
//包含字符串
export const containsString = (long, short) => {return long.indexOf(short) !== -1;}
//创建随机字符串
export const createRandomStr = (len) => {len = len || 32;let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';let maxPos = $chars.length;let pwd = '';for (let i = 0; i < len; i++) {pwd += $chars.charAt(Math.floor(Math.random() * maxPos));}return pwd;};
// 计算
export const Calc = {
    // +
    Add: function (arg1, arg2) {arg1 = arg1.toString();arg2 = arg2.toString();let arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "", d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";let maxLen = Math.max(d1.length, d2.length);let m = Math.pow(10, maxLen);let result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));let d = arguments[2];return typeof d === "number" ? Number((result).toFixed(d)) : result;},
    // -
    Sub: function (arg1, arg2) {return this.Add(arg1, -Number(arg2), arguments[2]);},
    // *
    Mul: function (arg1, arg2) {let r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));},
    // /
    Div: function (arg1, arg2) {let r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));}
};
//异步返回结果
export const timeout = (result = undefined, duration = 0) => {return new Promise((resolve, reject) => {setTimeout(() => { resolve(result) }, duration);})}
// 生成uuid
export const uuid = () => { let s = []; let hexDigits = "0123456789abcdef"; for (let i = 0; i < 36; i++) { s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);} s[14] = "4"; s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); s[8] = s[13] = s[18] = s[23] = "-"; let uuid = s.join(""); return uuid;};
//list转tree
export const listToTree = (list, pid) => { let tree = []; let temp = ''; list.forEach((item, index) => { if (item.pid == pid) { let obj = { name: item.name, id: item.id, pid: item.pid}; temp = listToTree(list, item.id); obj.children = temp; tree.push(obj); }}); return tree;};