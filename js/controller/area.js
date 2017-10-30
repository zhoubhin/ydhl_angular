app.controller('areaController', ['$scope', '$http', 'AreaList', function ($scope, $http, AreaList) {
    init();
    var reg = new RegExp("^[0-9]*$");
    $scope.addArea = function () {
        if (!reg.test($scope.newArea.areaId)) {
            alert("请输入数字!");
            $('#addAreaId').focus();
            return;
        }
        if ($scope.newArea.areaId.length > 4) {
            alert("请输入少于4位数字的编号!");
            $('#addAreaId').focus();
            return;
        }
        $http({
            url: APIurl + '/area/add',
            method: 'POST',
            data: $scope.newArea
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.areas.push($.extend({}, $scope.newArea));
        });
    };
    $scope.updateArea = function () {
        $http({
            url: APIurl + '/area/update',
            method: 'POST',
            data: $scope.toUpdateArea
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.deleteArea = function () {
        $http({
            url: APIurl + '/area/delete',
            method: 'POST',
            data: {
                'areaId': $scope.toDeleteId
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.selectAreaToUpdate = function () {
        for (var idx in $scope.areas) {
            var area = $scope.areas[idx];
            if (area.areaId === $scope.toUpdateId) {
                $scope.toUpdateArea = area;
                return;
            }
        }
        $scope.toUpdateArea = null;
    };

    function init() {
        $scope.areas = null;
        $scope.newArea = {};
        $scope.toUpdateId = null;
        $scope.toUpdateArea = null;
        $scope.toDeleteId = null;
        AreaList.query(function (res) {
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