app.controller('sysvarController', ['$scope', '$http', 'SysvarList', function ($scope, $http, SysvarList) {
    init();
    $scope.setEnable = function (id, value) {
        $http({
            url: APIurl + '/sysvar/update',
            method: 'POST',
            data: {
                'sysvarId': id,
                'value': value
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.addSysvar = function () {
        $http({
            url: APIurl + '/sysvar/add',
            method: 'POST',
            data: $scope.newSysvar
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.sysvars.push($.extend({}, $scope.newSysvar));
        });
    };
    $scope.updateSysvar = function () {
        $http({
            url: APIurl + '/sysvar/update',
            method: 'POST',
            data: $scope.toUpdateSysvar
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.deleteSysvar = function (sysvarId, idx) {
        $http({
            url: APIurl + '/sysvar/delete',
            method: 'POST',
            data: {
                'sysvarId': sysvarId
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.sysvars.splice(idx, 1);
        });
    };
    $scope.selectSysvarToUpdate = function () {
        for (var idx in $scope.sysvars) {
            var sysvar = $scope.sysvars[idx];
            if (sysvar.sysvarId === $scope.toUpdateId) {
                $scope.toUpdateSysvar = sysvar;
                return;
            }
        }
        $scope.toUpdateSysvar = null;
    };

    function init() {
        $scope.newSysvar = {
            code: null,
            name: null,
            type: null,
            value: null
        };
        $scope.toUpdateSysvar = null;
        $scope.toUpdateId = null;
        SysvarList.query(function (res) {
            if (res.code === -200) {
                location.href = APIurl + '/login.html';
                return;
            }
            if (res.code !== 200) {
                return;
            }
            var data = res.data;
            var ret = [];
            for (var key in data) {
                var value = data[key];
                value['sysvarId'] = value['sysvar_id'];
                delete value['sysvar_id'];
                value['code'] = key;
                ret.push(value);
            }
            ret.sort(function (a, b) {
                return a.sysvarId - b.sysvarId;
            });
            $scope.sysvars = ret;
        });
    }
}]);