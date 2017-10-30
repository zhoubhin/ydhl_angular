app.controller('articleController', ['$scope', '$http', 'ArticleList', 'AreaList', function ($scope, $http, ArticleList, AreaList) {
    init();
    $scope.selectArticleToUpdate = function () {
        $http({
            url: APIurl + "/article?articleId=" + $scope.toUpdateId,
            method: 'GET'
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.toUpdateArticle = res.data;
        });
    };
    $scope.updateArticle = function () {
        $http({
            url: APIurl + "/article/update",
            method: 'POST',
            data: {
                'articleId': $scope.toUpdateId,
                'title': $scope.toUpdateArticle.title,
                'content': $scope.toUpdateArticle.content
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.addArticle = function () {
        $http({
            url: APIurl + "/article/add",
            method: 'POST',
            data: $scope.newArticle
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.articles.push($.extend({}, $scope.newArticle));
        });
    };
    $scope.deleteArticle = function () {
        $http({
            url: APIurl + "/article/delete",
            method: 'POST',
            data: {
                'articleId': $scope.toDeleteId
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.assign = function () {
        $http({
            url: APIurl + '/article/assign',
            method: 'POST',
            data: {
                'areaId': $scope.selectedAreaId,
                'articleId': $scope.toAssign.articleId,
                'rank': $scope.toAssign.rank
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
            }
        });
    };
    $scope.revoke = function (articleId, idx) {
        $http({
            url: APIurl + '/article/revoke',
            method: 'POST',
            data: {
                'areaId': $scope.selectedAreaId,
                'articleId': articleId
            }
        }).success(function (res) {
            if (res.code !== 200) {
                alert(res.message);
                return;
            }
            $scope.selectedArticles.splice(idx, 1);
        });
    };
    $scope.$watch('selectedAreaId', function (newValue, oldValue) {
        if (newValue) {
            $http({
                url: APIurl + '/article/titles?areaId=' + newValue,
                method: 'GET'
            }).success(function (res) {
                if (res.code !== 200) {
                    alert(res.message);
                    return;
                }
                var data = res.data;
                for (var idx in data) {
                    var value = data[idx];
                    value['articleId'] = value['article_id'];
                    delete value['article_id'];
                }
                $scope.selectedArticles = data;
            });
        }
    });

    function init() {
        $scope.articles = null;
        $scope.areas = null;
        $scope.newArticle = {};
        $scope.toUpdateId = null;
        $scope.toUpdateArticle = null;
        $scope.toDeleteId = null;

        $scope.selectedAreaId = null;
        $scope.selectedArticles = null;
        $scope.toAssign = {
            'articleId': null,
            'rank': null
        };

        ArticleList.query(function (res) {
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
                value['articleId'] = value['article_id'];
                delete value['article_id'];
            }
            data.sort(function (a, b) {
                return a.articleId - b.articleId;
            });
            $scope.articles = data;
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