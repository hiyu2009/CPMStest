System.register(["@angular/core", "@angular/http"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var UserUpdateService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            UserUpdateService = (function () {
                function UserUpdateService(http) {
                    this.http = http;
                }
                UserUpdateService.prototype.getUserData = function (userModel) {
                    var url = 'http://localhost:8080/admin/selectUserDetail';
                    var header = new http_1.Headers();
                    header.append('Content-Type', 'application/json'); //JSON
                    header.append('Authorization', 'Bearer ' + localStorage.getItem("token")); //토큰 가져온다
                    header.append('RoleCode', localStorage.getItem("roleCode")); //각각 user의 rolecode 가져온다
                    return this.http.post(url, JSON.stringify(userModel), { headers: header });
                };
                UserUpdateService.prototype.getUpdateUserData = function (userModel) {
                    var url = 'http://localhost:8080/admin/updateUser';
                    var header = new http_1.Headers();
                    header.append('Content-Type', 'application/json'); //JSON
                    header.append('Authorization', 'Bearer ' + localStorage.getItem("token")); //토큰 가져온다
                    header.append('RoleCode', localStorage.getItem("roleCode")); //각각 user의 rolecode 가져온다
                    return this.http.post(url, JSON.stringify(userModel), { headers: header });
                };
                UserUpdateService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserUpdateService);
                return UserUpdateService;
            }());
            exports_1("UserUpdateService", UserUpdateService);
        }
    }
});
//# sourceMappingURL=userUpdate.service.js.map