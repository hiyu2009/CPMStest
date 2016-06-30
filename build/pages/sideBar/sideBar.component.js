System.register(['@angular/core', '@angular/router', '@angular/common', 'ng2-accordion', '../login/services/login.service'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, ng2_accordion_1, login_service_1;
    var SideBar;
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
            function (ng2_accordion_1_1) {
                ng2_accordion_1 = ng2_accordion_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            SideBar = (function () {
                function SideBar(loginService) {
                    this.loginService = loginService;
                    this.selMenuModel = [];
                    this.partnerMenuList = [];
                    this.projectMenuList = [];
                    this.progressMenuList = [];
                    this.adminMenuList = [];
                    if (localStorage.getItem("currentUserData") != null) {
                        this.selMenuModel = JSON.parse(localStorage.getItem("currentUserData")).selectMenuModels;
                        for (var _i = 0, _a = this.selMenuModel; _i < _a.length; _i++) {
                            var menuModel = _a[_i];
                            if (menuModel.showYN == "Y") {
                                switch (menuModel.mainMenuId) {
                                    case 2:
                                        this.partnerMenuList.push(menuModel);
                                        break;
                                    case 3:
                                        this.projectMenuList.push(menuModel);
                                        break;
                                    case 4:
                                        this.progressMenuList.push(menuModel);
                                        break;
                                    case 5:
                                        this.adminMenuList.push(menuModel);
                                        break;
                                }
                            }
                        }
                    }
                    console.log(this.partnerMenuList);
                    console.log(this.projectMenuList);
                    console.log(this.progressMenuList);
                    console.log(this.adminMenuList);
                }
                SideBar = __decorate([
                    core_1.Component({
                        selector: 'side-bar',
                        templateUrl: './app/pages/sideBar/sideBar.html',
                        directives: [ng2_accordion_1.ACCORDION_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
                        styleUrls: ['app/pages/sideBar/sidebar.css']
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService])
                ], SideBar);
                return SideBar;
            }());
            exports_1("SideBar", SideBar);
        }
    }
});
//# sourceMappingURL=sideBar.component.js.map