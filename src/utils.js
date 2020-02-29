/**
 * Created by sleep on 16/12/29.
 */
/* eslint-disable */
import Vue from 'vue';
import Qs from 'qs';
import axios from 'axios';
import Vuecookie from 'vue-cookie';
import ElementUI from 'element-ui';

axios.defaults.withCredential = true;
Vue.prototype.$http = axios;

Vue.use(Vuecookie);
Vue.use(ElementUI);


let params = {
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.3.21:8080' : 'http://192.168.3.251:8081',
  // baseUrl: process.env.NODE_ENV === 'development' ? 'https://sxy.online.xdjy100.com/admin' : 'http://sxy2.kaituocn.com/admin',
  imgUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.3.21:8080/' : 'http://192.168.3.251:8081/',
  ueUrl: process.env.NODE_ENV === 'development' ? 'http://sxy2.kaituocn.com' : 'http://sxy2.kaituocn.com',
};
Vue.prototype.config = {
  api: params.baseUrl,
  imgUrl: params.imgUrl,
  ueUrl: params.ueUrl
};
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
//token失效提示
// 加工组合结束时间
function getEndTime(createTime, daysToEnd) {
  // createTime == 添加时间  daysToEnd == 结束时间
  let timeArray = createTime.split(' ');
  let yearMonthDayArray = timeArray[0].split('-');
  let days = getDaysInMonth(yearMonthDayArray[0], yearMonthDayArray[1]);
  let i = yearMonthDayArray.length;
  if (daysToEnd === undefined) { // 设置默认过期时间
    daysToEnd = 15;
  }
  while (i--) {
    yearMonthDayArray[i] = Number(yearMonthDayArray[i]);
  }
  if (yearMonthDayArray[2] + daysToEnd >= days) { // 判断日子大于当前月份最大天数时更新月份以及当月天数
    yearMonthDayArray[1] += 1;
    if (yearMonthDayArray[1] + 1 >= 12) { // 判断月份大于12 进行年份更新
      yearMonthDayArray[0] += 1;
      yearMonthDayArray[1] = 1; // 将月份转换为0
      return yearMonthDayArray.join('-') + ' ' + timeArray[1];
    }
    yearMonthDayArray[2] = yearMonthDayArray[2] + daysToEnd - days;
    return yearMonthDayArray.join('-') + ' ' + timeArray[1];
  }
  yearMonthDayArray[2] += daysToEnd;
  return yearMonthDayArray.join('-') + ' ' + timeArray[1];
}
// 计算某月多少天
function getDaysInMonth(year, month) {
  month = parseInt(month, 10);
  let d = new Date(year, month, 0);
  return d.getDate();
}
// function
export default {
  params,
  sendAjax(_this, post, i, token) {
    _this.loading = true;
    _this.loginDig = false;
    let p = new Promise((resolve, reject) => {
      _this.$http.post(Vue.prototype.config.api + i, Qs.stringify(post), {
        headers: {
          'token': token
        }
      }).then(res => {
        _this.loading = false;
        switch (Number(res.data.code)) {
          case 1:
            resolve(res.data);
            break
          case -41:
            _this.$message.error('请重新登录');
            _this.$router.push({ name: 'Login' })
            break
          // case -4:
          //   _this.$message.error('该手机号尚未有登录权限，请联系管理员添加权限');
          //   break;
          // case 10002:
          //   _this.$message.error('该账号正在使用中');
          //   _this.$router.push({name: 'Login'})
          //   break;
          // case -29:
          //   _this.$message.error('未修改内容');
          //   break;
          // case -15:
          // case -16:
          // case -19:
          //   _this.$router.replace('/');
          // case -17:  // 请传递token
          //   _this.$cookie.delete('yourname');
          //   _this.$router.replace('/');
          //   _this.$nextTick(() => {
          //     _this.$message.error('登录出错，请重试');
          //   });
          //   break;
          default:
            _this.$nextTick(() => {
              _this.$message.error(res.data.message);
            });
            break;
        }
      },
        err => {
          reject(err);
          _this.loading = false;
          _this.$message.error('网络超时');
        }
      );
    });
    return p;
  },
  sendGet(_this, post, i, token) {
    _this.loading = true;
    _this.loginDig = false;
    // _this.$http.options.credentials = true
    let p = new Promise((resolve, reject) => {
      // _this.withCredentials = true
      _this.$http.get(Vue.prototype.config.api + i, Qs.stringify(post), {
        headers: {
          'token': token
        }
      }).then(res => {
        _this.loading = false;
        switch (Number(res.data.code)) {
          case 1:
            resolve(res.data);
            break
          case '1':
            resolve(res.data);
            break
          case 4:
            resolve(res.data);
            break
          case -41:
            _this.$message.error('请重新登录');
            _this.$router.push({ name: 'Login' })
            break
          // case 2:
          //   break
          // case -4:
          //   _this.$message.error('该手机号尚未有登录权限，请联系管理员添加权限');
          //   break;
          // case 10002:
          //   _this.$message.error('该账号正在使用中');
          //   _this.$router.push({name: 'Login'})
          //   break;
          // case -29:
          //   _this.$message.error('未修改内容');
          //   break;
          // case -15:
          // case -16:
          // case -19:
          //   _this.$router.replace('/');
          // case -17:  // 请传递token
          //   break;
          default:
            _this.$nextTick(() => {
              _this.$message.error(res.data.message);
            });
            break;
        }
      },
        err => {
          reject(err);
          _this.loading = false;
          _this.$message.error('网络超时');
        }
      );
    });
    return p;
  },
  sendPut(_this, post, i, token) {
    _this.loading = true;
    _this.loginDig = false;
    // _this.$http.options.credentials = true
    let p = new Promise((resolve, reject) => {
      _this.$http.put(Vue.prototype.config.api + i, Qs.stringify(post), {
        headers: { 'token': token }
      }).then(res => {
        _this.loading = false;
        switch (Number(res.data.code)) {
          case 1:
            resolve(res.data);
            break
          case '1':
            resolve(res.data);
            break
          case -41:
            _this.$message.error('请重新登录');
            _this.$router.push({ name: 'Login' })
            break
          // case 3:
          //   resolve(res.data);
          //   _this.$message.success('操作成功');
          //   break
          // case 4:
          //   resolve(res.data);
          //   _this.$message.success('操作成功');
          //   break
          // case -4:
          //   _this.$message.error('该手机号尚未有登录权限，请联系管理员添加权限');
          //   break;
          // case 10002:
          //   _this.$message.error('该账号正在使用中');
          //   _this.$router.push({name: 'Login'})
          //   break;
          // case -29:
          //   _this.$message.error('未修改内容');
          //   break;
          // case -15:
          // case -16:
          // case -19:
          //   _this.$router.replace('/');
          // case -17:  // 请传递token
          //   break;
          default:
            _this.$nextTick(() => {
              _this.$message.error(res.data.message);
            });
            break;
        }
      },
        err => {
          reject(err);
          _this.loading = false;
          _this.$message.error('网络超时');
        }
      );
    });
    return p;
  },
  sendDelete(_this, post, i, token) {
    _this.loading = true;
    _this.loginDig = false;
    // _this.$http.options.credentials = true
    let p = new Promise((resolve, reject) => {
      _this.$http.delete(Vue.prototype.config.api + i, Qs.stringify(post), {
        headers: { 'token': token }
      }).then(res => {
        _this.loading = false;
        console.log(res.data.code)
        switch (Number(res.data.code)) {
          case 1:
            resolve(res.data);
            break
          case '1':
            resolve(res.data);
            break
          case -41:
            _this.$message.error('请重新登录');
            _this.$router.push({ name: 'Login' })
            break
          case 4:
            resolve(res.data);
            _this.$message.success('操作成功');
            break
          case -22:
            _this.$message.error('此部门还有其他员工，不能删除');
            break;
          case 10002:
            _this.$message.error('该账号正在使用中');
            _this.$router.push({ name: 'Login' })
            break;
          case -29:
            _this.$message.error('未修改内容');
            break;
          case -15:
          case -16:
          case -19:
            _this.$router.replace('/');
          case -17:  // 请传递token
            break;
          default:
            _this.$nextTick(() => {
              _this.$message.error(res.data.message);
            });
            break;
        }
      },
        err => {
          reject(err);
          _this.loading = false;
          _this.$message.error('网络超时');
        }
      );
    });
    return p;
  },


  //将"2018-05-19T08:04:52.000+0000"转化为格式时间
  formatDate(timer) {
    var date = new Date(timer)
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  formate(timer) {
    var date = new Date(timer)
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D
  }
}






















//   formatDate(date, fmt) {
//     if (typeof date === 'string') {
//       if (date === '') {
//         return false;
//       } else {
//         date = new Date(date);
//         if (isNaN(date.getTime())) {
//           return false;
//         }
//       }
//     }
//     if ((typeof date === 'object') && date instanceof Date) {
//       if (/(y+)/.test(fmt)) {
//         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
//       }
//       let o = {
//         'm+': date.getMonth() + 1,
//         'd+': date.getDate(),
//         'h+': date.getHours(),
//         'i+': date.getMinutes(),
//         's+': date.getSeconds()
//       };
//       for (let k in o) {
//         if (new RegExp(`(${k})`).test(fmt)) {
//           let str = o[k] + '';
//           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
//         }
//       }
//       return fmt;
//     } else {
//       return false;
//     }
//   },
//   inArray(array, item) {
//     if (array) {
//       for (let i = 0; i < array.length; i++) {
//         if (array[i] === item) {
//           return i;
//         }
//       }
//       return -1;
//     } else {
//       return -1;
//     }
//   },
//   empty(obj) {
//     return !obj || JSON.stringify(obj) === '[]' || JSON.stringify(obj) === '{}';
//   },
//   getCTime(createTime, daysToEnd) {
//     // createTime 必须为'2017-01-10 17:47:09'格式 daysToEnd: 数字类型
//     const overDate = (new Date(getEndTime(createTime, daysToEnd))).getTime() - (new Date()).getTime();
//     const date = new Date(overDate);
//     const d = Math.floor((date / 1000 / 60 / 60 / 24));
//     const hour = Math.floor(date / 1000 / 60 / 60 - (24 * d));
//     const minutes = Math.floor(date / 1000 / 60 - (24 * 60 * d) - (60 * hour));
//     const seconds = Math.floor(date / 1000 - (24 * 60 * 60 * d) - (60 * 60 * hour) - (60 * minutes));
//     return d + '天' + hour + '小时' + minutes + '分钟' + seconds + '秒';
//   },
//   trim(str) {
//     if (str) {
//       return str.replace(/(^\s*)|(\s*$)/g, '');
//     }
//   },
//   getArray(context, type, by) {
//     if (context === undefined || context === null) {
//       return [];
//     }
//     if (!by) {
//       by = ',';
//     }
//     if (type === 'array') {
//       return context.split(by);
//     } else {
//       return context.split(by)[0];
//     }
//   },
//   getLoadIngPack: {
//     pngRectangle: '/static/image/logored.png'  //默认图
//   },
//   clone(obj) {
//     let o;
//     switch (typeof obj) {
//       case 'undefined':
//         break;
//       case 'string':
//         o = obj + '';
//         break;
//       case 'number':
//         o = obj - 0;
//         break;
//       case 'boolean':
//         o = obj;
//         break;
//       case 'object':
//         if (obj === null) {
//           o = null;
//         } else {
//           if (obj instanceof Array) {
//             o = [];
//             for (let i = 0, len = obj.length; i < len; i++) {
//               o.push(this.clone(obj[i]));
//             }
//           } else {
//             o = {};
//             for (let k in obj) {
//               o[k] = this.clone(obj[k]);
//             }
//           }
//         }
//         break;
//       default:
//         o = obj;
//         break;
//     }
//     return o;
//   },
//   // 截取？号后面的字符串
//   GetRequest() {
//     let url = window.location.search; // 获取url中"?"符后的字串
//     let theRequest = {};
//     if (url.indexOf('?') !== -1) {
//       let str = url.substr(1);
//       let strs = str.split('&');
//       for (let i = 0; i < strs.length; i++) {
//         theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
//       }
//     }
//     return theRequest;
//   },
//   // 此方法用于图片不显示时设置为默认
//   formatImg(option) {
//     if (option) {
//       option = option.split(',')[0];
//       if (option.indexOf('http') === -1) {
//         option = Vue.prototype.config.imgUrl + option;
//       }
//     } else {
//       option = this.getLoadIngPack.pngRectangle;
//     }
//     return option;
//     // return option + '?' + Math.random();
//   },
//   formatInt(number) {
//     if (number) {
//       number = parseInt(number);
//       if (isNaN(number)) {
//         number = 0;
//       }
//     } else {
//       number = 0;
//     }
//     return number;
//   },
//   charToHtml(str) {
//     if (str) {
//       str = str.replace(/&amp;/g, '&');
//       str = str.replace(/&lt;/g, '<');
//       str = str.replace(/&gt;/g, '>');
//       str = str.replace(/&quot;/g, "'");
//       str = str.replace(/&apos;/g, "'");
//       str = str.replace(/&nbsp;/g, ' ');
//       str = str.replace(/&#039;/g, ' ');
//     }
//     return str;
//   },
//   timestampToTime(timestamp) {
//     var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//    (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//   },
//   GMTToStr(time) {
//     let date = new Date(time)
//     var Y = date.getFullYear() + '-';
//     var M=(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//     var D=date.getDate()<10?'0'+date.getDate()+' ':date.getDate()+' '
//     var h=date.getHours()<10?'0'+date.getHours()+':':date.getHours()+':'
//     var m = date.getMinutes()<10? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
//     var s = date.getSeconds()<10? '0' + date.getSeconds() : date.getSeconds();
//     return Y+M+D+h+m+s;
//   },
//   GMTTo(time) {
//     let date = new Date(time)
//     var Y = date.getFullYear() + '-';
//     var M=(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//     var D=date.getDate()<10?'0'+date.getDate()+' ':date.getDate()+' '
//     return Y+M+D;
//   },
//   GMT(time) {
//     let date = new Date(time)
//     var h=date.getHours()<10?'0'+date.getHours()+':':date.getHours()+':'
//     var m=date.getMinutes()<10?'0'+date.getMinutes()+':':date.getMinutes()+':'
//     var s=date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()
//     return h+m+s;
//   },
//   charToHtml2(str) {
//     if (str) {
//       str = str.replace(/&amp;quot;/g, '');
//     }
//     return str;
//   },
//   parserDate (date) {
//     let t = Date.parse(date);
//     if (!isNaN(t)) {
//       return new Date(Date.parse(date.replace(/-/g, "/")));
//     } else {
//       return new Date();
//     }
//   },
//   subStr(text, length) {
//     if (text && text.length > length) {
//       return text.substr(0, length - 2) + '...';
//     } else {
//       return text;
//     }
//   },
//   nl2br(text) {
//     if (text) {
//       return text.replace(/\n/g, '<br />');
//     } else {
//       return '';
//     }
//   },
//   // 根据时间获得距离今天的字符串表达（1年前，3天前，2小时前...）
//   jitianqian(str) {
//     let now = new Date().getTime();
//     let time = new Date(str).getTime();
//
//     // 当输入的时间不是合法的时间
//     if (isNaN(time)) {
//       return '';
//     }
//
//     now = parseInt(now / 1000);
//     time = parseInt(time / 1000);
//
//     let diff = now - time;
//
//     if (diff > 31536000) {
//       return parseInt(diff / 31536000) + '年前';
//     } else if (diff > 2592000) {
//       return parseInt(diff / 2592000) + '月前';
//     } else if (diff > 86400) {
//       return parseInt(diff / 86400) + '天前';
//     } else if (diff > 3600) {
//       return parseInt(diff / 3600) + '小时前';
//     } else if (diff > 60) {
//       return parseInt(diff / 60) + '分钟前';
//     } else {
//       return diff + '秒前';
//     }
//   },
//   //给数字前加0
//   PrefixInteger(num, length) {
//     return (Array(length).join('0') + num).slice(-length);
//   },
// //  字符串转化时间戳
//   fmtDate(obj){
//     var date = new Date(obj * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//     var Y = date.getFullYear() + '-';
//     var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//     var D = date.getDate()  < 10 ? '0' + date.getDate() : date.getDate() + ' ';
//     return Y+M+D;
//   }
// };
