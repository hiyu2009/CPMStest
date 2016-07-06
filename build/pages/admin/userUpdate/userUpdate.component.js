System.register(['@angular/core', '@angular/router', '@angular/common', '../../../common/models/user.model', './services/userUpdate.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, common_1, user_model_1, userUpdate_service_1;
    var UserUpdate;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (user_model_1_1) {
                user_model_1 = user_model_1_1;
            },
            function (userUpdate_service_1_1) {
                userUpdate_service_1 = userUpdate_service_1_1;
            }],
        execute: function() {
            UserUpdate = (function () {
                function UserUpdate(userUpdateService) {
                    this.userUpdateService = userUpdateService;
                    this.userModel = new user_model_1.UserModel();
                    this.userIdModel = { 'userId': '' };
                    this.userId = "test11";
                    this.deptCodeModels = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;
                    this.rankCodeModels = JSON.parse(localStorage.getItem("currentUserData")).rankCodeModels;
                    this.roleCodeModels = JSON.parse(localStorage.getItem("currentUserData")).roleCodeModels;
                }
                ;
                UserUpdate.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userIdModel.userId = this.userId;
                    // console.log(typeof(this.userModel.userId));
                    this.userUpdateService.getUserData(this.userIdModel).subscribe(function (data) {
                        _this.userModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);
                    }), function (error) { return console.log(error); };
                };
                ;
                UserUpdate.prototype.onSubmit = function () {
                    var _this = this;
                    this.userUpdateService.getUpdateUserData(this.userModel).subscribe(function (data) {
                        _this.resultModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);
                        if (_this.resultModel.result) {
                            console.log("성공");
                        }
                        else {
                            console.log("실패" + _this.resultModel.message);
                        }
                    }),
                        function (error) { return console.log(error); };
                };
                ;
                UserUpdate = __decorate([
                    core_1.Component({
                        selector: 'user-update',
                        templateUrl: 'app/pages/admin/userUpdate/userUpdate.html',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
                        providers: [userUpdate_service_1.UserUpdateService],
                        styleUrls: ['./app/pages/admin/css/admin.css']
                    }), 
                    __metadata('design:paramtypes', [userUpdate_service_1.UserUpdateService])
                ], UserUpdate);
                return UserUpdate;
            }());
            exports_1("UserUpdate", UserUpdate);
        }
    }
});
//# sourceMappingURL=userUpdate.component.js.map