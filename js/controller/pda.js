app.controller('pdaController', ['$scope', '$http', 'AreaList', function($scope, $http, AreaList){
    init();

    $scope.del = function(pdaId, idx) {
        $http({
            url: APIurl + '/pda/delete',
            method: 'POST',
            data: {
                'pdaId': pdaId
            }
        }).success(function(res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.selectedPdas.splice(idx, 1);
        });
    };

    $scope.add = function() {
        $http({
            url: APIurl + '/pda/add',
            method: 'POST',
            data: {
                'areaId': $scope.selectedAreaId,
                'pdaId': $scope.toAssign.pdaId
            }
        }).success(function(res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
        });
    };

    $scope.$watch('selectedAreaId', function(newValue, oldValue) {
        if (newValue) {
            $http({
                url: APIurl + '/area/pda?areaId=' + newValue,
                method: 'GET'
            }).success(function(res) {
                if (res.code !== 200) {
                    alert(res.message);
                    return;
                }
                $scope.selectedPdas = res.data;
            });
        }
    });

    function init() {
        $scope.areas = null;
        $scope.pdaOfArea = null;
        $scope.selectedAreaId = null;
        $scope.selectedPdas = null;
        $scope.toAssign = {
            'pdaId': null,
        };

        AreaList.query(function(res) {
            if(res.code== -200){
                location.href= APIurl + '/login.html';
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