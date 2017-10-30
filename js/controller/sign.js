app.controller('signController', ['$scope', '$http', 'SignList', 'AreaList', function ($scope, $http, SignList, AreaList) {
    init();
    $scope.addSign = function () {
        $http({
            url: APIurl + '/sign/add',
            method: 'POST',
            data: $scope.newSign
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.signs.push($.extend({}, $scope.newSign));
        });
    };
    $scope.selectSignToUpdate = function () {
        for (var idx in $scope.signs) {
            var sign = $scope.signs[idx];
            if (sign.signId === $scope.toUpdateId) {
                $scope.toUpdateSign = sign;
                return;
            }
        }
        $scope.toUpdateSign = null;
    };
    $scope.updateSign = function () {
        $http({
            url: APIurl + '/sign/update',
            method: 'POST',
            data: $scope.toUpdateSign
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.deleteSign = function () {
        $http({
            url: APIurl + '/sign/delete',
            method: 'POST',
            data: {
                'signId': $scope.toDeleteId
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.assign = function () {
        $http({
            url: APIurl + '/sign/assign',
            method: 'POST',
            data: {
                'areaId': $scope.selectedAreaId,
                'signId': $scope.toAssign.signId,
                'rank': $scope.toAssign.rank
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.revoke = function (signId, idx) {
        $http({
            url: APIurl + '/sign/revoke',
            method: 'POST',
            data: {
                'areaId': $scope.selectedAreaId,
                'signId': signId
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.selectedSigns.splice(idx, 1);
        });
    };
    $scope.$watch('selectedAreaId', function (newValue, oldValue) {
        if (newValue) {
            $http({
                url: APIurl + '/sign/list?areaId=' + newValue,
                method: 'GET'
            }).success(function (res) {
                if (res.code !== 200) {
                    alert(res.message);
                    return;
                }
                var data = res.data;
                for (var idx in data) {
                    var value = data[idx];
                    value['signId'] = value['sign_id'];
                    delete value['sign_id'];
                    value['voiceCode'] = value['voice_code'];
                    delete value['voice_code'];
                }
                $scope.selectedSigns = data;
            });
        }
    });

    function init() {
        $scope.signs = null;
        $scope.areas = null;
        $scope.newSign = {};
        $scope.toUpdateId = null;
        $scope.toUpdateSign = null;
        $scope.toDeleteId = null;

        $scope.selectedAreaId = null;
        $scope.selectedArea = null;
        $scope.selectedSigns = null;
        $scope.showAssign = false;

        $scope.toAssign = {
            'signId': null,
            'rank': null
        };

        SignList.query(function (res) {
            if (res.code === -200) {
                location.href = APIurl + '/login.html';
                return;
            }
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            var data = res.data;
            for (var idx in data) {
                var value = data[idx];
                value['signId'] = value['sign_id'];
                delete value['sign_id'];
                value['voiceCode'] = value['voice_code'];
                delete value['voice_code'];
            }
            data.sort(function (a, b) {
                return a.signId - b.signId;
            });
            $scope.signs = data;
        });

        AreaList.query(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            var data = res.data;
            for (var idx in data) {
                var value = data[idx];
                value['areaId'] = value['area_id'];
                delete value['area_id'];
                value['digitalCaseVersion'] = value['digital_case_version'];
                delete value['digital_case_version'];
                value['wdType'] = value['wd_type'];
                delete value['wd_type'];
            }
            $scope.areas = data;
        });
    }
}]);