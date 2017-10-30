app.controller('rfidController', ['$scope', '$http', 'RfidList', function ($scope, $http, RfidList) {
    init();
    $scope.updateRfid = function () {
        $http({
            url: APIurl + '/rfid/updateRfid',
            method: 'POST',
            data: $scope.toUpdateRfid
        }).success(function (res) {
            if (res.code === 1) {
                alert('更新成功');
                $scope.queryRfid();
            } else {
                alert('更新失败');
            }
        });
    };
    $scope.deleteRfid = function () {
        $http({
            url: APIurl + '/rfid/deleteRfid',
            method: 'POST',
            data: {
                'rfidSn': $scope.toUpdateRfid.rfidSn
            }
        }).success(function (res) {
            if (res.code === 1) {
                alert('删除成功');
                $scope.queryRfid();
            } else {
                alert('删除失败');
            }
        });
    };
    $scope.selectRfidToUpdate = function () {
        for (var idx in $scope.rfids) {
            var rfid = $scope.rfids[idx];
            if (rfid.rfidSn === $scope.toUpdateRfid.rfidSn) {
                $scope.toUpdateRfid = rfid;
                return;
            }
        }
        $scope.toUpdateRfid = null;
    };
    $scope.queryList = function () {
        $scope.searchVal.pageNo = 1;
        $scope.queryRfid();
    };
    $scope.queryRfid = function () {
        $scope.searchVal.pageSize = 10;
        $http({
            url: APIurl + '/rfid/queryPageList',
            method: 'POST',
            data: $scope.searchVal
        }).success(function (res) {
            $scope.rfids = null;
            $scope.toUpdateId = null;
            $scope.toUpdateRfid = null;
            $scope.judge = null;
            resetRfid(res);
        });
    };
    $scope.preRfid = function () {
        var totalPages = $scope.pagination.total_pages;
        if ($scope.pagination.page_no > 1) {
            $scope.searchVal.pageNo = $scope.pagination.page_no - 1;
            $scope.queryRfid();
        }
    };
    $scope.afterRfid = function () {
        var totalPages = $scope.pagination.total_pages;
        if (totalPages > $scope.pagination.page_no) {
            $scope.searchVal.pageNo = $scope.pagination.page_no + 1;
            $scope.queryRfid();
        }
    };
    $scope.toRfid = function () {
        var totalPages = $scope.pagination.total_pages;
        if (totalPages > $scope.searchVal.pageNo || $scope.searchVal.pageNo > 0) {
            $scope.queryRfid();
        }
    };

    function resetRfid(res) {
        var data = res.object;
        $scope.pagination = data;
        if (data.total_count > 0) {
            for (var idx in data.list) {
                var value = data.list[idx];
                value['rfidSn'] = value['rfid_sn'];
                value['areaName'] = value['area_name'];
                value['jtId'] = value['jt_id'];
                delete value['rfid_sn'];
            }
            $scope.rfids = data.list;
        } else {
            $scope.rfids = [];
        }
        if (data.total_pages <= 1) {
            $('#pageDiv').hide();
        }
    }

    function init() {
        $scope.rfids = null;
        $scope.toUpdateId = null;
        $scope.toUpdateRfid = null;
        $scope.pagination = null;
        $scope.areas = null;
        RfidList.query(function (res) {
            if (res.code === -200) {
                location.href = APIurl + '/login.html';
                return;
            }
            resetRfid(res);
        });
        $http({
            url: APIurl + '/area/list',
            method: 'get'
        }).success(function (res) {
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