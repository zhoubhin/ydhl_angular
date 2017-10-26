/**
 * Created by hbprotoss on 1/11/16.
 */

app = angular.module('ydhlApp', ['ngResource', 'ui.bootstrap']);

app.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $httpProvider.defaults.transformRequest = function(data, headersGetter) {
            return data && $.param(data);
        };
    }
]);

APIurl = 'http://183.131.151.159:8080/ydhl';
function loginOut(){
        $.post(APIurl+"/login/loginOut",{},function(data){
            location.href=APIurl+'/login.html';
        })
}
function closePwd(){
    $("#oldPwd").val('');
    $("#nowPwd").val('');
    $("#rePwd").val('');
    $('#myModal').modal('hide')
}
function changePwd(){
        var oldPwd=$("#oldPwd").val();
        var nowPwd=$("#nowPwd").val();
        var rePwd=$("#rePwd").val();
        $("#oldSpan").html("");$("#nowSpan").html("");$("#reSpan").html("");
        $("tr td span").addClass("spans");
        if(oldPwd==""){
            $("#oldSpan").html("当前密码为空！");
            return false;
        }
        if(nowPwd==""){
            $("#nowSpan").html("新密码为空!");
            return false;
        }
        if(rePwd==""){
            $("#reSpan").html("确认密码为空!");
            return false;
        }
        if(nowPwd!=rePwd){
            $("#reSpan").html("新密码和确认密码不同！请认真填写！");
            return false;
        }
        $.post(
            APIurl+"/admin/updatePwd",
            {oldPwd:oldPwd,nowPwd:nowPwd,rePwd:rePwd},
            function(data){
                alert(data.desc);
                if(data.code==1){
                    $('#myModal').modal('hide');
                    $("#oldPwd").val('');
                    $("#nowPwd").val('');
                    $("#rePwd").val('');
                }
            }
        )
}
app.factory('SysvarList', ['$resource', function($resource){
    return $resource(APIurl + '/sysvar/list', {}, {
        query: {
            method: 'get'
        }
    });
}]);

app.factory('RfidList', ['$resource', function($resource){
    return $resource(APIurl + '/rfid/queryPageList', {}, {
        query: {
            method: 'get'
        }
    });
}]);
app.factory('AreaList', ['$resource', function($resource){
    return $resource(APIurl + '/area/list', {}, {
        query: {
            method: 'get'
        }
    });
}]);

app.factory('SignList', ['$resource', function($resource){
    return $resource(APIurl + '/sign/all', {}, {
        query: {
            method: 'get'
        }
    });
}]);

app.factory('ArticleList', ['$resource', function($resource){
    return $resource(APIurl + '/article/titles', {}, {
        query: {
            method: 'get'
        }
    });
}]);

app.factory('ApkLast', ['$resource', function($resource){
    return $resource(APIurl + '/version/last', {}, {
        query: {
            method: 'get'
        }
    });
}]);