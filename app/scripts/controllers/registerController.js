angular.module('app')
    .controller('registerController',
    function ($scope, AssetFactory, EmployeeFactory, $uibModal) {
        $scope.animationsEnabled = true;
        $scope.approvalsRequired = false;
        $scope.assets = [];
        $scope.isResultOK = false;
        $scope.showSearch = false;
        $scope.canAssetFetched = true;
        $scope.alerts = [];
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.model = {
            name: 'Tabs'
        };
        $scope.unAssignAsset = {};

        $scope.assetTabDisable = true;
        $scope.assetHistoryTabDisable = true;

        $scope.showDangerMessage = false;
        $scope.dangerMessage="";

        $scope.showWarningMessage = false;
        $scope.warningMessage = "";

        $scope.showSuccessMessage = false;
        $scope.successMessage="";

        $scope.employeeList = [];

        $scope.search = {};

        $scope.updateEmp = {};

        $scope.search = {
            approvalsRequired : 'NA'
        }

        $scope.showAssetTable = false;

        $scope.showHistoryTable = false;

        $scope.isValidForm = true;

        $scope.firstNameError = false;
        $scope.lastNameError = false;
        $scope.emailError = false;
        $scope.ecodeError = false;

        function resetMessages(){
            $scope.showDangerMessage = false;
            $scope.dangerMessage="";

            $scope.showWarningMessage = false;
            $scope.warningMessage = "";

            $scope.showSuccessMessage = false;
            $scope.successMessage="";

        }
        function showMessage(msg,type){
            resetMessages();
            if(type == "SUCCESS"){
                $scope.showSuccessMessage = true;
                $scope.successMessage = msg;
            }

            if(type == "WARNING"){
                $scope.showWarningMessage = true;
                $scope.warningMessage = msg;
            }

            if(type == "DANGER"){
                $scope.showDangerMessage = true;
                $scope.dangerMessage = msg;
            }
        }

        function resolveError(status){
            if(status == -1){
                return "Our Serve is not working right now. Please try again after some time."
            }
            if(status == 500){
                return "Something went wrong at Server Side."
            }
        }
        $scope.closeDangerMsg = function(){
            $scope.showDangerMessage = false;
            $scope.dangerMessage = "";
        }

        $scope.closeWarningMsg = function(){
            $scope.showWarningMessage = false;4
            $scope.warningMessage = "";
        }

        $scope.closeSuccessMsg = function(){
            $scope.showSuccessMessage = false;
            $scope.SuccessMessage = "";
        }

        $scope.clearForm = function(){
            $scope.search = {};
            $scope.search.approvalsRequired = 'NA';
            $scope.assets = [];
            $scope.assetTabDisable = true;
            $scope.assetHistoryTabDisable = true;
            resetMessages();
            $scope.isValidForm = true;

            $scope.firstNameError = false;
            $scope.lastNameError = false;
            $scope.emailError = false;
            $scope.ecodeError = false;

        }

        function fetchAll() {
            $scope.isResultOK = false;
            EmployeeFactory.getEmployeeList().success(function (data) {
                $scope.employeeList = angular.copy(data);
                console.log($scope.employeeList);
                $scope.isResultOK = true;
            }).error(function (data, status, headers, config) {
                showMessage(resolveError(status), "DANGER");
            });
        }

        $scope.refreshAssets = function () {
            if ($scope.assetTabDisable == false) {
                AssetFactory.getAssetListByEmployee($scope.employeeList[0].id).success(function (data) {
                    $scope.assets = angular.copy(data);
                    showMessage($scope.assets.length + " Asset(s) Found.", "SUCCESS");
                    if (data.length == 0)
                        $scope.showAssetTable = false;
                    else
                        $scope.showAssetTable = true;
                }).error(function (data, status, headers, config) {
                    showMessage(resolveError(status), "DANGER");
                });
            }
        }

        $scope.employeeId = "";

        $scope.fetch = function () {
            /*  var $myModal = $('.custom-modal');
             $myModal.fadeIn();
             */
            $scope.isValidForm = true;

            $scope.firstNameError = false;
            $scope.lastNameError = false;
            $scope.emailError = false;
            $scope.ecodeError = false;
            waitingDialog.show("Please wait while data is loading . . .");
            $scope.assets = [];
            $scope.isResultOK = false;
    //        $scope.parseApprovalCheckBox();
            EmployeeFactory.fetchEmployee($scope.search).success(function (data) {
                $scope.employeeList = angular.copy(data);
                console.log($scope.employeeList);

                $scope.search = {
                    approvalsRequired : 'NA'
                }
                if ($scope.employeeList.length == 0) {
                    showMessage(" No Records Found.", "WARNING")
                } else if ($scope.employeeList.length > 1) {
                    $scope.isResultOK = true;
                    $scope.canAssetFetched = false;
                    $scope.assetTabDisable = true;
                    $scope.assetHistoryTabDisable = true;
                    showMessage($scope.employeeList.length + " Employee(s) Found. But no tabs are enabled. To Enable them restrict your search to one result.","SUCCESS");
                }
                else {
                    if ($scope.employeeList.length == 1) {
                        $scope.isResultOK = true;
                        $scope.employeeId = $scope.employeeList[0].id;
                        AssetFactory.getAssetListByEmployee($scope.employeeList[0].id).success(function (data) {
                            $scope.assets = angular.copy(data);
                        });
                        $scope.assetTabDisable = false;
                        $scope.assetHistoryTabDisable = false;
                        showMessage(" Asset & Asset History Tabs is enable now.","SUCCESS");
                    }

                }
                //  $myModal.fadeOut();
                waitingDialog.hide();
            })
                .error(function (data, status, headers, config) {
                    if(status == 401){
                        window.location = ""
                    }
                    else {
                        showMessage(resolveError(status), "DANGER");
                    }
                    waitingDialog.hide();
                });
        }

        $scope.returnAsset = function (assetId) {
            $scope.unAssignAsset.assetId = assetId;
            $scope.unAssignAsset.employee = $scope.employeeId;
            AssetFactory.unAssignAsset($scope.unAssignAsset).success(function (data) {
                console.log(data);
                AssetFactory.getAssetListByEmployee($scope.employeeList[0].id).success(function (data) {
                    $scope.assets = angular.copy(data);
                    showMessage("Asset Un-Assigned Successfully.","SUCCESS");
                }).error(function (data, status, headers, config) {
                    showMessage(resolveError(status), "DANGER");
                    waitingDialog.hide();
                });
            }).error(function (data, status, headers, config) {
                showMessage(resolveError(status), "DANGER");
                waitingDialog.hide();
            });
        }

        $scope.assetsHistory = [];
        $scope.fetchHistory = function () {
            if ($scope.assetHistoryTabDisable == false) {
                AssetFactory.getAssetHistoryForEmployee($scope.employeeId).success(function (data) {
                    $scope.assetsHistory = angular.copy(data);
                    showMessage($scope.assetsHistory.length + " Asset History Found.", "SUCCESS");
                    if (data.length == 0) {
                        $scope.showHistoryTable = false;
                    }
                    else {
                        $scope.showHistoryTable = true;
                    }
                }).error(function (data, status, headers, config) {
                    showMessage(resolveError(status), "DANGER");
                });
            }
        }


        $scope.validateForm = function () {
            $scope.firstNameError = false;
            $scope.lastNameError = false;
            $scope.emailError = false;
            $scope.ecodeError = false;
            var fields = "";
            if($scope.search.firstName == "" || $scope.search.firstName === undefined){
                fields += "First Name";
                $scope.firstNameError = true;

                $scope.isValidForm = false;
            }
            if($scope.search.lastName == "" || $scope.search.lastName === undefined){
                if($scope.firstNameError == true){
                    fields += ", ";
                }
                fields += "Last Name";
                $scope.lastNameError = true;

                $scope.isValidForm = false;
            }
            if($scope.search.email == "" || $scope.search.email === undefined){
                if($scope.lastNameError == true){
                    fields += ", ";
                }
                fields += "Email";
                $scope.emailError = true;

                $scope.isValidForm = false;
            }
            if($scope.search.ecode == "" || $scope.search.ecode === undefined){
                if($scope.emailError == true){
                    fields += ", ";
                }
                fields += "Employee Code ";
                $scope.ecodeError = true;
                $scope.isValidForm = false;
            }
            if($scope.isValidForm == false) {
                showMessage("Please Enter " + fields + " as they are required.", "WARNING");
            }
        }

        $scope.parseApprovalCheckBox = function () {
            if ($scope.approvalsRequired == true) {
                $scope.search.approvalsRequired = "Y";
            }
            else {
                $scope.search.approvalsRequired = "N";
            }
        }

        $scope.editEmp = function(index){
            $("#ecodeTxt"+index).hide();
            $("#firstNameTxt"+index).hide();
            $("#lastNameTxt"+index).hide();
            $("#mobileTxt"+index).hide();
            $("#emailTxt"+index).hide();
            $("#ecodeType"+index).show();
            $("#firstNameType"+index).show();
            $("#lastNameType"+index).show();
            $("#mobileType"+index).show();
            $("#emailType"+index).show();
            $("#pencilEmp"+index).hide();
            $("#saveEmp"+index).show();
            $("#approvalReq"+index).hide();
            $("#approvalReqEdit"+index).show();
        }

        $scope.updateEmployee = function(index, id){
            $("#ecodeTxt"+index).show();
            $("#firstNameTxt"+index).show();
            $("#lastNameTxt"+index).show();
            $("#mobileTxt"+index).show();
            $("#emailTxt"+index).show();
            $("#ecodeType"+index).hide();
            $("#firstNameType"+index).hide();
            $("#lastNameType"+index).hide();
            $("#mobileType"+index).hide();
            $("#emailType"+index).hide();
            $("#pencilEmp"+index).show();
            $("#saveEmp"+index).hide();
            $("#approvalReq"+index).show();
            $("#approvalReqEdit"+index).hide();
            $scope.updateEmp.id = id;
            EmployeeFactory.update($scope.updateEmp).success(function(data){
                $scope.search = {
                    approvalsRequired : 'NA'
                }
                if (data.status == 'SUCCESS') {
                    showMessage("Data Saved Successfully.", "SUCCESS")
                }
                else {
                    showMessage(data.error['errorMsg'], "DANGER");
                }
                fetchAll();
            }).error(function (data, status, headers, config) {
                showMessage(resolveError(status), "DANGER");
            });
            $scope.updateEmp ={};
        }

        $scope.save = function () {
            $scope.isResultOK = false;
           // $scope.parseApprovalCheckBox();
            waitingDialog.show("Please wait while data is getting saved . . .");
            $scope.validateForm();
            if($scope.isValidForm == true) {
                EmployeeFactory.save($scope.search).success(function (data) {
                    console.log(data);
                    $scope.search = {
                        approvalsRequired : 'NA'
                    }
                    if (data.status == 'SUCCESS') {
                        showMessage("Data Saved Successfully.", "SUCCESS")
                    }
                    else {
                        showMessage(data.error['errorMsg'], "DANGER");
                    }
                    fetchAll();
                }).error(function (data, status, headers, config) {
                    showMessage(resolveError(status), "DANGER");
                    waitingDialog.hide();
                });
            }
            waitingDialog.hide();
        }

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.toggleSearch = function () {
            $scope.showSearch = !$scope.showSearch;
        };
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        $scope.openAssetWindow = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    id: function () {
                        return $scope.employeeId;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {

            });
        };
    }
);
angular.module('app').controller('ModalInstanceCtrl', function ($scope, AssetFactory, EmployeeFactory, $uibModalInstance, id) {

    $scope.id = id;
    $scope.showPrint = false;

    $scope.assetTypeList = [];

    $scope.assetList = [];
    $scope.selectedAssetType = "";
    $scope.assignAsset = {};
    $scope.approvers = [];
    $scope.assetTypeDisplayList = [];
    $scope.assetDisplayList = [];
    $scope.approversList = [];
    $scope.approversDisplayList = [];
    $scope.dummyEmployee = {
      id : -1,
      firstName : 'Please select Approver',
      lastName : ""
    };
    $scope.assetTypeDummy = {
      id:-1,
      type : 'Please select Asset Type',
        numberOfAsset:0
    };

    $scope.assetDummy = {
        id:-1,
        name : 'Please select Asset '
    };
    init();

    function init() {
        AssetFactory.getAssetTypeList().success(function (data) {
            $scope.assetTypeList = angular.copy(data);
            $scope.assetTypeDisplayList[0] = $scope.assetTypeDummy;
            $scope.selectedAssetType = $scope.assetTypeDummy.id;
            for(var index = 0 ; index < $scope.assetTypeList.length ; index ++){
                $scope.assetTypeDisplayList.push($scope.assetTypeList[index]);
            }
        });
        EmployeeFactory.getApprovers().success(function (data) {
            $scope.approvers = angular.copy(data);
            $scope.approversDisplayList[0] = $scope.dummyEmployee;
            for(var index = 0 ; index < $scope.approvers.length ; index ++){
                $scope.approversDisplayList.push($scope.approvers[index]);
            }
            $scope.assignAsset.approvedBy = $scope.dummyEmployee.id;
        });
        console.log($scope.assetTypeDisplayList);
        console.log($scope.approversDisplayList);
    }

    $scope.fetchAvailableAssetsByType = function () {
        AssetFactory.getAvailableAssetByType($scope.selectedAssetType).success(function (data) {
            $scope.assetList = angular.copy(data);
            $scope.assetDisplayList[0] = $scope.assetDummy;
            $scope.assignAsset.assetId = $scope.assetDummy.id;
            for(var index = 0 ; index < $scope.assetList.length ; index ++){
                $scope.assetDisplayList.push($scope.assetList[index]);
            }
        });
    }
    $scope.popup3 = {
        opened: false
    };

    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };

    $scope.popup4 = {
        opened: false
    };

    $scope.open4 = function () {
        $scope.popup4.opened = true;
    };

    $scope.ok = function () {
        $scope.assignAsset.employee = id;
        AssetFactory.assignAsset($scope.assignAsset).success(function (data) {
            console.log(data);
            $scope.showPrint = true;
        });

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.print = function () {
        $uibModalInstance.close();

    }
})

    .factory('EmployeeFactory', function ($http, $cookieStore) {

        return{
            getEmployeeList: function () {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.get('http://localhost:8080/inventory/employee/fetchAll');
            },
            fetchEmployee: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/employee/fetch', data);
            },
            save: function (data) {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/employee/create', data);
            },
            getApprovers: function () {
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.get('http://localhost:8080/inventory/employee/getApprovers');
            },
            update: function(data){
                $http.defaults.headers.common.Authorization = $cookieStore.get('token');
                $http.defaults.headers.common.Username = $cookieStore.get('Username');
                return $http.post('http://localhost:8080/inventory/employee/update', data);
            }
        }
    })

;