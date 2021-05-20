import md5 from "js-md5";
import moment from "moment";

// 获取签名
export function getSign(params, pubkey) {
    return md5(sortParams(params, pubkey));
}

// 参数排序生成对应字符串
export function sortParams(params, pubkey) {
    let paramters = Object.assign({}, params);
    let sortKeys = Object.keys(paramters).sort();
    let sortedStr = "";
    sortKeys.forEach((item) => {
        // if (paramters[item] === undefined) {
        //     return
        // }
        sortedStr += `${item}=${paramters[item]}&`;
    });
    // console.log(`${sortedStr}salt=${pubkey}`)
    return `${sortedStr}salt=${pubkey}`;
}

/**
 * 生成一个指定位数的随机字符串
 * @param {String} len 字符串长度
 */
export function randomAlphaNum(len) {
    var rdmString = "";
    for (
        ;
        rdmString.length < len;
        rdmString += Math.random().toString(36).substr(2)
    );
    return rdmString.substr(0, len).toUpperCase();
}

/**
 * 格式化时间
 * @param {Object | String | Number} datetime 时间戳
 * @param {String} format 格式化字符串
 */
export function formatDate(datetime, format) {
    let formatStr = format || "yyyy-MM-dd hh:mm:ss";
    let date = "";
    if (Object.prototype.toString.call(datetime) === "[object Date]") {
        date = datetime;
    } else {
        date = new Date(datetime);
    }
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        S: date.getMilliseconds(), //millisecond
    };
    if (/(y+)/.test(formatStr))
        formatStr = formatStr.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatStr))
            formatStr = formatStr.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    }
    return formatStr;
}

/**
 * 获取当天0时0分0秒的时间戳
 */
export function getTodayTimeStamp() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return +date;
}

/**
 * 格式化年月日时间（简单版）
 * @param { Date } dateObj
 * @returns { String } '2020-1-2'
 */
export function getFormatDate(dateObj) {
    let date = dateObj || new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/**
 * 获取昨天的时间对象
 */
export function getYestoday() {
    let dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() - 1);
    return new Date(dateTime);
}

/**
 * 判断是否为安卓手机
 */
export function isAndroid() {
    return /android/i.test(navigator.userAgent.toLowerCase());
}

/**
 * 判断是否为苹果手机
 */
export function isApple() {
    return /iphone|ipod|ipad|Macintosh/i.test(
        navigator.userAgent.toLowerCase()
    );
}

/**
 *  判断是否为微信环境
 */
export function isWeiXin() {
    return /MicroMessenger/i.test(navigator.userAgent.toLowerCase());
}

/**
 *  判断是否为手机
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(
        navigator.userAgent.toLowerCase()
    );
}

/**
 * 获取cookie值
 * @param {String} cookie的key
 */
export function getCookie(name) {
    var arr = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    );
    if (arr != null) return unescape(arr[2]);
    return null;
}

/**\
 * @param {String} name //微信授权路径
 */

export function getUrlParam(name) {
    //name为要获取的参数名
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let rrr = decodeURIComponent(window.location.search);
    let r = rrr.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 地址路径截取
 *  @param {String} name
 */
export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 获取手机dpr
 */
export function getDPR() {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
    }
    return 1;
}

/**
 * 数字取整
 * @param {Number} value
 */
export function parseValue(value) {
    return parseInt(value, 10);
}

/**
 * 验证手机号码
 * @param {String} val
 */
export function verifyPhoneNumber(val) {
    return /^1\d{10}$/.test(val);
}

/**
 * 验证身份证
 * @param {String} val
 */
export function verifyIdCardNumber(val) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
}

/**
 * 是否为医生端
 */
export function isDoctorApp() {
    return /\/doctor\.html/.test(window.location.href);
}

/**
 * 信息中间部分转*号
 * @param {String | Number} value 要转的字符串
 * @param { Number } showLen 两边需要显示的长度
 */
export function hideInfo(value, showLen = 2) {
    let val = String(value);
    let length = val.length;
    let str = val
        .split("")
        .map((char, index) => {
            if (index > showLen - 1 && index < length - showLen) {
                return "*";
            }
            return char;
        })
        .join("");
    return str;
}

// 加载js
export function loadScript(src, callback) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = src;
    script.onload = function () {
        callback && callback();
    };
    document.body.appendChild(script);
}
// 删除指定元素
// array.splice(array.findIndex(item => item === 2), 1);
// 字符转数组
// '1==2== 3==4 ==5'.split('==');
// 数组转字符
// [1,2,3,4,5].join(',');

//=================================处理时间类Begin===================================
export const formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
        [year, month, day].map(formatNumber).join("/") +
        " " +
        [hour, minute].map(formatNumber).join(":")
    );
};

export const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : "0" + n;
};

export const formatDateTime = (str) => {
    if (typeof str !== "string" || str === "") {
        return "无";
    }
    return str.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})\d{2}\d*$/,
        (match, p1, p2, p3, p4, p5) => {
            return `${p1}-${p2}-${p3} ${p4}:${p5}`;
        }
    );
};
export function timestampToString(timestamp) {
    moment.locale("en", {
        longDateFormat: {
            l: "YYYY-MM-DD",
            L: "YYYY-MM-DD HH:mm:ss",
        },
    });
    return moment(timestamp).format("l");
}
export function formatDate(timestamp) {
    moment.locale("en", {
        longDateFormat: {
            l: "YYYY-MM-DD",
            L: "YYYY-MM-DD HH:mm:ss",
        },
    });
    return moment(timestamp).format("L");
}
//===================================处理时间类End=================================
