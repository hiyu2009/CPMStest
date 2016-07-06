System.register(['@angular/core', '@angular/router', '@angular/common', '../../../common/models/user.model', './services/userAdd.service'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, user_model_1, userAdd_service_1;
    var UserAdd;
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
            function (userAdd_service_1_1) {
                userAdd_service_1 = userAdd_service_1_1;
            }],
        execute: function() {
            UserAdd = (function () {
                //서버와의 통신을 위한 service파일
                function UserAdd(userAddService) {
                    this.userAddService = userAddService;
                    //UserModel 변수 정의하고 값을 가지고 올 new 객체 생성
                    this.userModel = new user_model_1.UserModel();
                    //currentUser의 partnerCodeModel과 businessCodeModel데이터들을 서버로 JSON 형태로 포맷해서 보낸다
                    this.deptCodeModels = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;
                    this.rankCodeModels = JSON.parse(localStorage.getItem("currentUserData")).rankCodeModels;
                    this.roleCodeModels = JSON.parse(localStorage.getItem("currentUserData")).roleCodeModels;
                }
                ;
                //4가지 등록 정보 입력 후 등록 버튼을 누르면서 데이터들을 JSON 포맷 형태로 넘길수 있게 맵핑
                UserAdd.prototype.onSubmit = function () {
                    var _this = this;
                    this.userAddService.addUserData(this.userModel).subscribe(function (data) {
                        _this.resultModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);
                        if (_this.resultModel.result) {
                            console.log("성공");
                        }
                        else {
                            console.log("실패" + _this.resultModel.message);
                        }
                    });
                };
                UserAdd = __decorate([
                    core_1.Component({
                        selector: 'user-add',
                        templateUrl: 'app/pages/admin/userAdd/userAdd.html',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
                        providers: [userAdd_service_1.UserAddService],
                        styleUrls: ['./app/pages/admin/css/admin.css']
                    }), 
                    __metadata('design:paramtypes', [userAdd_service_1.UserAddService])
                ], UserAdd);
                return UserAdd;
            }());
            exports_1("UserAdd", UserAdd);
        }
    }
});
//# sourceMappingURL=userAdd.component.js.map