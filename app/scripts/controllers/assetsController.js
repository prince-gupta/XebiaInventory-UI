angular.module('app')
    .controller('assetController',
    function ($scope, AssetFactory, $uibModal) {
        $scope.infoPopover = {
            templateUrl: 'popoverInfoTemplate.html',
            title: 'Configuration',
            cpu:'N/A',
            ram:'N/A',
            hdd:'N/A'
        };
        $scope.typeDeletePopover = {
            content: 'Hello, World!',
            templateUrl: 'typeDeleteConfirmation.html',
            title: 'Confirmation',
            id: 1
        };

        init();

        function init(){
            fetchAllAsset();
        }
        $scope.animationsEnabled = true;
        $scope.showTypeInput = false;
        $scope.assetTypeList = [];
        $scope.assetList = [];
        $scope.assetType = {};
        $scope.isEditAssetType = true;
        $scope.isDoneAssetType = false;
        $scope.isEditManu = true;
        $scope.isDoneManu = false;
        $scope.updateAssetType = {};
        $scope.manufacturerList = [];
        $scope.updateManu = {};
        $scope.updateHW = {};
        $scope.hwConfigList = [];
        $scope.newHW = {};
        $scope.assetHWConfig = [];

        $scope.addDeletedID = function (id) {
            $scope.typeDeletePopover.id = id;
        }

        $scope.hideAssetTypePopup = function (id) {
            $(".popover").hide();
        }

        $scope.fetchAllAssetType = function () {
            fetchAllAssetType();
        }

        $scope.fetchAllAsset = function () {
            fetchAllAsset();
        }
        $scope.fetchAllManufacturer = function(){
            fetchAllManufacturer();
        }

        $scope.fetchAllHWConfig = function(){
            fetchHardwareConfigurations();
        }

        $scope.populateHwConfig = function(id){
            var hwInfo = $scope.assetHWConfig[id];
            $scope.infoPopover.cpu = hwInfo.cpu;
            $scope.infoPopover.hdd = hwInfo.hdd;
            $scope.infoPopover.ram = hwInfo.ram;
        }


        $scope.edit = function (index) {
            $("#labelType" + index).hide();
            $("#editType" + index).show();
            $("#pencilType" + index).hide();
            $("#floppyType" + index).show();
            $("#cancleType" + index).show();
            $scope.updateAssetType = {};
        }

        $scope.done = function (index, id) {
            $("#labelType" + index).show();
            $("#editType" + index).hide();
            $("#pencilType" + index).show();
            $("#floppyType" + index).hide();
            $("#cancleType" + index).hide();
            $scope.updateAssetType.id = id;
            AssetFactory.updateAssetType($scope.updateAssetType).success(function (data) {
                console.log(data);
                fetchAllAssetType();
            });
        }

        $scope.doneWithNoActio = function (index, id) {
            $("#labelType" + index).show();
            $("#editType" + index).hide();
            $("#pencilType" + index).show();
            $("#floppyType" + index).hide();
            $("#cancleType" + index).hide();
            $scope.updateAssetType.id = id;
        }






        $scope.editManu = function (index) {
            $("#labelManuName" + index).hide();
            $("#labelManuAdd" + index).hide();
            $("#labelManuMobile" + index).hide();
            $("#labelManuEmail" + index).hide();
            $("#editManuName" + index).show();
            $("#editManuAdd" + index).show();
            $("#editManuMobile" + index).show();
            $("#editManuEmail" + index).show();
            $("#pencilManu" + index).hide();
            $("#floppyManu" + index).show();
            $("#cancleManu" + index).show();
            $scope.updateManu = {};
        }

        $scope.doneManu = function (index, id) {
            $("#labelManuName" + index).show();
            $("#labelManuAdd" + index).show();
            $("#labelManuMobile" + index).show();
            $("#labelManuEmail" + index).show();
            $("#editManuName" + index).hide();
            $("#editManuAdd" + index).hide();
            $("#editManuMobile" + index).hide();
            $("#editManuEmail" + index).hide();
            $("#pencilManu" + index).show();
            $("#floppyManu" + index).hide();
            $("#cancleManu" + index).hide();
            $scope.updateManu.id = id;
            AssetFactory.updateManufacturer($scope.updateManu).success(function (data) {
                console.log(data);
                fetchAllManufacturer();
            });
        }

        $scope.doneWithNoActionManu = function (index, id) {
            $("#labelManuName" + index).show();
            $("#labelManuAdd" + index).show();
            $("#labelManuMobile" + index).show();
            $("#labelManuEmail" + index).show();
            $("#editManuName" + index).hide();
            $("#editManuAdd" + index).hide();
            $("#editManuMobile" + index).hide();
            $("#editManuEmail" + index).hide();
            $("#pencilManu" + index).show();
            $("#floppyManu" + index).hide();
            $("#cancleManu" + index).hide();
            $scope.updateManu = {};
        }



        $scope.editHW = function (index) {
            $("#labelHWName" + index).hide();
            $("#labelHWCPU" + index).hide();
            $("#labelHWHDD" + index).hide();
            $("#labelHWRAM" + index).hide();
            $("#editHWName" + index).show();
            $("#editHWCPU" + index).show();
            $("#editHWHDD" + index).show();
            $("#editHWRAM" + index).show();
            $("#pencilHW" + index).hide();
            $("#floppyHW" + index).show();
            $("#cancleHW" + index).show();
            $scope.updateHW = {};
        }

        $scope.doneHW = function (index, id) {
            $("#labelHWName" + index).show();
            $("#labelHWCPU" + index).show();
            $("#labelHWHDD" + index).show();
            $("#labelHWRAM" + index).show();
            
            $("#editHWName" + index).hide();
            $("#editHWCPU" + index).hide();
            $("#editHWHDD" + index).hide();
            $("#editHWRAM" + index).hide();
            
            $("#pencilHW" + index).show();
            $("#floppyHW" + index).hide();
            $("#cancleHW" + index).hide();
            $scope.updateHW.id = id;
            AssetFactory.updateHWConfig($scope.updateHW).success(function (data) {
                console.log(data);
                fetchHardwareConfigurations();
            });
        }

        $scope.doneWithNoActionHW = function (index, id) {
            $("#labelHWName" + index).show();
            $("#labelHWCPU" + index).show();
            $("#labelHWHDD" + index).show();
            $("#labelHWRAM" + index).show();

            $("#editHWName" + index).hide();
            $("#editHWCPU" + index).hide();
            $("#editHWHDD" + index).hide();
            $("#editHWRAM" + index).hide();

            $("#pencilHW" + index).show();
            $("#floppyHW" + index).hide();
            $("#cancleHW" + index).hide();
            $scope.updateHW = {};
        }


        function fetchAllAssetType() {
            AssetFactory.getAssetTypeList().success(function (data) {
                $scope.assetTypeList = angular.copy(data);
            });
        }

        function fetchAllAsset() {
            AssetFactory.getAssetList().success(function (data) {
                $scope.assetList = angular.copy(data);
                for(var index =0 ; index < $scope.assetList.length ; index++){
                    var hwObj = {};
                    hwObj.cpu = $scope.assetList[index].hardwareConfiguration.cpu;
                    hwObj.hdd = $scope.assetList[index].hardwareConfiguration.hdd;
                    hwObj.ram = $scope.assetList[index].hardwareConfiguration.ram;
                    $scope.assetHWConfig[$scope.assetList[index].assetId] = hwObj;
                }
            }).error(function (data, status, headers, config) {
                if(status == 401){
                    window.location = ""
                }
                else {
                    showMessage(resolveError(status), "DANGER");
                }
                waitingDialog.hide();
            });;
        }

        function fetchAllManufacturer(){
            AssetFactory.getManufacturerList().success(function (data){
                $scope.manufacturerList = angular.copy(data);
            });
        }

        function fetchHardwareConfigurations(){
            AssetFactory.fetchHardwareConfigurations().success(function (data){
               $scope.hwConfigList = angular.copy(data);
            });
        }

        $scope.saveType = function () {
            AssetFactory.saveAssetType($scope.assetType).success(function (data) {
                console.log(data);
                fetchAllAssetType();
            });
        }

        $scope.deleteAssetType = function (id) {
            AssetFactory.deleteAssetType(id).success(function (data) {
                console.log(data);
                fetchAllAssetType();
            });
        }
        $scope.openAddAssetWindow = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myAssetModalContent.html',
                controller: 'AssetModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {

            });
        },
            $scope.openAddTypeWindow = function () {
                $scope.showTypeInput = true;
            },
            $scope.openAddManufacturerWindow = function (size) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'ManufacturerModalContent.html',
                    controller: 'ManufacturerModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {

                });
            },
            $scope.openAddHWConfigWindow = function (size) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'HWConfigModalContent.html',
                    controller: 'HWConfigModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {

                });
            }
    })
    .factory('AssetFactory', function ($http, $cookieStore) {
        return{
            getAssetTypeList: function () {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.get('http://localhost:8080/inventory/asset/fetchAllAssetType');
            },
            saveAssetType: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/createAssetType', data);
            },
            deleteAssetType: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/deleteAssetType', data);
            },
            updateAssetType: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/updateAssetType', data);
            },
            getAssetList: function () {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.get('http://localhost:8080/inventory/asset/fetchAllAsset');
            },
            saveAsset: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/createAsset', data);
            },
            deleteAsset: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/deleteAsset', data);
            },
            getAssetListByEmployee: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/fetchEmployeeAsset', data);
            },
            getAssetByType: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/fetchAssetByType', data);
            },
            getAvailableAssetByType: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/fetchAvailableAssetByType', data);
            },
            assignAsset: function(data){
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/assignAsset', data);
            },
            unAssignAsset: function(data){
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/unAssignAsset', data);
            },
            getManufacturerList: function () {
                return $http.get('http://localhost:8080/inventory/asset/fetchAllAssetManufacturer');
            },
            saveManufacturer: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/createAssetManufacturer', data);
            },
            deleteManufacturer: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/deleteAssetManufacturer', data);
            },
            updateManufacturer: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/updateAssetManufacturer', data);
            },
            fetchHardwareConfigurations : function(){
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.get('http://localhost:8080/inventory/asset/fetchAllConfiguration');
            },
            saveHWConfig: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/createHardwareConfigurations', data);
            },
            updateHWConfig: function(data){
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/updateHardwareConfigurations',data);
            },
            getAssetHistoryForEmployee: function(data){
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/asset/getAssetsHistory',data);
            }
        }
    })
;

angular.module('app').controller('AssetModalInstanceCtrl', function ($scope, AssetFactory,$uibModalInstance, items) {

    $scope.assetTypeList1 = [];
    $scope.assetTypeDisplayList = [];
    $scope.manufacturerList = [];
    $scope.manufacturerDisplayList = [];
    $scope.hwConfigList = [];
    $scope.hwConfigDisplayList = [];
    $scope.asset = {};
    $scope.popup5 = {
        opened: false
    };
    $scope.dummyAssetType = {
        type:'Select Type of Asset',
        id: -1
    };
    $scope.dummyManufacturer = {
        name:'Select Manufacturer of Asset',
        id: -1
    };
    $scope.dummyHardwareConfig = {
        id: -1,
        label:'Select Hardware Configuration of Asset'
    };
    init();

    function init(){
        AssetFactory.getAssetTypeList().success(function (data) {
            $scope.assetTypeList1 = angular.copy(data);
            $scope.assetTypeDisplayList[0] = ($scope.dummyAssetType);
            $scope.asset.assetType = ($scope.dummyAssetType.id);
            for(var index =0 ; index < $scope.assetTypeList1.length; index++){
                $scope.assetTypeDisplayList.push($scope.assetTypeList1[index]);
            }
        });
        AssetFactory.getManufacturerList().success(function (data) {
            $scope.manufacturerList = angular.copy(data);
            $scope.manufacturerDisplayList[0] = ($scope.dummyManufacturer);
            $scope.asset.assetManufacturer = $scope.dummyManufacturer.id;
            for(var index =0 ; index < $scope.manufacturerList.length; index++){
                $scope.manufacturerDisplayList.push($scope.manufacturerList[index]);
            }
        });
        AssetFactory.fetchHardwareConfigurations().success(function (data){
            $scope.hwConfigList = angular.copy(data);
            $scope.hwConfigDisplayList[0] = $scope.dummyHardwareConfig;
            $scope.asset.hardwareConfiguration = $scope.dummyHardwareConfig.id;
            for(var index = 0 ; index <$scope.hwConfigList.length; index ++){
                var attr = {};
                attr.label = $scope.hwConfigList[index].cpu + " " + $scope.hwConfigList[index].hdd + " " +$scope.hwConfigList[index].ram ;
                attr.id = $scope.hwConfigList[index].id;
                $scope.hwConfigDisplayList.push(attr);
            }
        });
    }
    $scope.open5 = function () {
        $scope.popup5.opened = true;

    };

    $scope.ok = function () {
        AssetFactory.saveAsset($scope.asset).success(function(data){
           console.log(data);
            $uibModalInstance.close();
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('app').controller('ManufacturerModalInstanceCtrl', function ($scope, AssetFactory, $uibModalInstance, items) {

    $scope.newManu = {};

    $scope.popup6 = {
        opened: false
    };

    $scope.open6 = function () {
        $scope.popup6.opened = true;
    };

    $scope.ok = function () {
        AssetFactory.saveManufacturer($scope.newManu).success(function(data){
            console.log(data);
            $uibModalInstance.close();
        });

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('app').controller('HWConfigModalInstanceCtrl', function ($scope, AssetFactory,$controller, $uibModalInstance, items) {

    var cntrl2 = $scope.$new();
    $controller('assetController',{$scope : cntrl2 });

    $scope.newHW = {};

    $scope.popup7 = {
        opened: false
    };

    $scope.open7 = function () {
        $scope.popup7.opened = true;
    };

    $scope.ok = function () {
        AssetFactory.saveHWConfig($scope.newHW).success(function(data){
            console.log(data);
            cntrl2.fetchAllHWConfig();
            $uibModalInstance.close();
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
