app.controller('apkController', ['$scope', '$http', 'ApkLast', function ($scope, $http, ApkLast) {
    init();
    $scope.addApk = function () {
        $http({
            url: APIurl + '/version/add',
            method: 'POST',
            data: $scope.newApk
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.lastApk = $.extend({}, $scope.newApk);
        })
    };

    function init() {
        $scope.lastApk = null;
        $scope.newApk = {};
        ApkLast.query(function (res) {
            $scope.lastApk = res;
        });
    }
}]);