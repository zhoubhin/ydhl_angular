/**
 * Created by Chou on 2015/12/17.
 */



//获取客户端版本信息
$(function () {
    $.ajax({
        type: 'GET',
        url: '' + APIurl + '/version/last',
        success: function (ver) {
            $('#version').append('<tr>' + '<td>' + ver.apkUrl + '</td>' + '<td>' + ver.appName + '</td>' + '<td>' + ver.changeLog + '</td>' + '<td>' + ver.updateTips + '</td>' + '<td>' + ver.versionCode + '</td>' + '<td>' + ver.versionName + '</td>' + '</tr>');
            if (ver.code == 400)
                alert('客户端请求异常！');
            if (ver.code == 500)
                alert('服务端异常！')
        }
    });
});

//添加客户端版本更新信息
function addVer() {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    var json_ver = $('#form_ver').serializeObject();
    $.ajax({
        type: 'POST',
        url: '' + APIurl + '/version/add',
        data: json_ver,
        success: function (msg) {
            console.log(JSON.stringify(json_ver));
            console.log(msg.data);
            alert('添加版本号信息成功');
        }
    });
}
