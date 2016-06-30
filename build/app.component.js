System.register(['@angular/core', '@angular/http', '@angular/router', './pages/navBar/navBar.component', './pages/sideBar/sideBar.component', './pages/login/services/login.service'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, navBar_component_1, sideBar_component_1, login_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (navBar_component_1_1) {
                navBar_component_1 = navBar_component_1_1;
            },
            function (sideBar_component_1_1) {
                sideBar_component_1 = sideBar_component_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(loginService) {
                    this.loginService = loginService;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        directives: [navBar_component_1.NavBar, sideBar_component_1.SideBar, router_1.ROUTER_DIRECTIVES],
                        providers: [login_service_1.LoginService, http_1.HTTP_PROVIDERS],
                        template: "\n    <nav-bar></nav-bar>\n    <side-bar></side-bar>\n    <router-outlet></router-outlet>\n  "
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
// <router-outlet></router-outlet>
//# sourceMappingURL=app.component.js.map