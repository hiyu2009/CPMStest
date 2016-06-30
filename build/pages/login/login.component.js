System.register(['@angular/core', '@angular/router', './services/login.service'], function(exports_1, context_1) {
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
    var core_1, router_1, login_service_1;
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(router, loginService) {
                    this.router = router;
                    this.loginService = loginService;
                    this.model = { 'userId': '', 'password': '' };
                }
                Login.prototype.onSubmit = function () {
                    var _this = this;
                    console.log("page user ID, PW : " + this.model);
                    this.loginService.sendCredentials(this.model).subscribe(function (data) {
                        var jsonToken = JSON.parse(JSON.stringify(data))._body;
                        console.log("get token success!, token: " + jsonToken);
                        //localStroage에
                        localStorage.setItem("token", jsonToken);
                        localStorage.setItem("userId", _this.model.userId);
                        _this.loginService.getLoginData(localStorage.getItem("userId")).subscribe(function (data) {
                            console.log("get Login data : " + JSON.parse(JSON.stringify(data))._body);
                            localStorage.setItem("currentUserData", JSON.parse(JSON.stringify(data))._body);
                            _this.userModel = JSON.parse(localStorage.getItem("currentUserData")).userModel;
                            localStorage.setItem("deptCode", _this.userModel.deptCode);
                            localStorage.setItem("userName", _this.userModel.userName);
                            localStorage.setItem("rankCode", _this.userModel.rankCode);
                            localStorage.setItem("roleCode", _this.userModel.roleCode);
                            window.location.reload();
                            var link = ['/'];
                            _this.router.navigate(link);
                        }),
                            function (error) { return console.log(error); };
                    }),
                        function (error) { return console.log(error); };
                };
                Login.prototype.logout = function () {
                    this.loginService.logout();
                };
                Login = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'app/pages/login/login.html',
                        styleUrls: ['app/pages/login/login.css']
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=login.component.js.map