/**
 * Created by Chou on 2015/12/23.
 */

APIurl = 'http://183.131.151.159:8080/ydhl';
//APIurl = 'http://api.yuexun.com/ydhl/api';

// $(function(){
//     $(document).ajaxSuccess(function(event, xhr, options, data) {
//         if (data.code === 400) {
//             alert('客户端请求异常!');
//             console.log(options.url + ":" + data.message);
//         } else if (data.code === 500) {
//             alert('服务端异常!');
//             console.log(options.URL + ":" + data.message);
//         }
//     });
// });

// function getCookie(c_name) {
//     if (document.cookie.length > 0) {
//         var c_start = document.cookie.indexOf(c_name + "=");
//         if (c_start != -1) {
//             c_start = c_start + c_name.length + 1;
//             var c_end = document.cookie.indexOf(";", c_start);
//             if (c_end == -1) c_end = document.cookie.length;
//             return decodeURI(document.cookie.substring(c_start, c_end));
//         }
//     }
//     else {
//         window.location.href = '' + APIurl + '/login';
//     }
// }

// function setCookie(c_name, value, expiredays) {
//     var exdate = new Date();
//     exdate.setDate(exdate.getDate() + expiredays);
//     document.cookie = c_name + "=" + escape(value) +
//         ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString())
// }

// function checkCookie() {
//     var username = getCookie('username');
//     if (username != null && username != "") {
//         alert('Welcome again ' + username + '!')
//     }
// }

