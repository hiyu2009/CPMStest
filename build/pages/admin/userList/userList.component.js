System.register(['@angular/core', './models/userList.model', './services/userList.service', '@angular/router', '../../../common/components/inline-edit/inline-edit.component', '../../../common/models/rankCode.model'], function(exports_1, context_1) {
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
    var core_1, userList_model_1, userList_service_1, router_1, inline_edit_component_1, rankCode_model_1;
    var userList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (userList_model_1_1) {
                userList_model_1 = userList_model_1_1;
            },
            function (userList_service_1_1) {
                userList_service_1 = userList_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (inline_edit_component_1_1) {
                inline_edit_component_1 = inline_edit_component_1_1;
            },
            function (rankCode_model_1_1) {
                rankCode_model_1 = rankCode_model_1_1;
            }],
        execute: function() {
            userList = (function () {
                function userList(userListService, userListModel, router) {
                    var _this = this;
                    this.userListService = userListService;
                    this.userListModel = userListModel;
                    this.router = router;
                    this.UserListModels = [];
                    this.userListService.selectUserList(this.userListModel).subscribe(function (data) {
                        _this.UserListModels = JSON.parse(JSON.parse(JSON.stringify(data))._body);
                        // this.UserListModels = JSON.parse(JSON.stringify(data))._body;
                        console.log("userList selectUserList 연동 성공 : ");
                    }, function (error) { console.log("userList error : " + error); });
                    this.rankCodeModels = JSON.parse(localStorage.getItem("currentUserData")).rankCodeModels;
                    this.deptCodeModels = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;
                    this.roleCodeModels = JSON.parse(localStorage.getItem("currentUserData")).roleCodeModels;
                    //alert(JSON.stringify(this.rankCodeModels));
                } // 생성자끝
                userList.prototype.onRowClick = function (event, id) {
                    //alert(JSON.stringify(UserListModel));
                    //let link = ['/project/selectDetail', colData.projectId];
                    // let link = ['/admin/selectUserDetail', UserListModel.userId];
                    // this.router.navigate(link);
                };
                userList.prototype.onChange = function () {
                    alert(" onChange 호출");
                };
                userList.prototype.saveEditable = function (value) {
                    alert("saveEditable 호출");
                };
                userList = __decorate([
                    core_1.Component({
                        selector: 'selectUserList',
                        providers: [userList_service_1.UserListService, userList_model_1.UserListModel, rankCode_model_1.RankCodeModel],
                        directives: [router_1.ROUTER_DIRECTIVES, inline_edit_component_1.InlineEditComponent],
                        templateUrl: 'app/pages/admin/userList/userList.html'
                    }), 
                    __metadata('design:paramtypes', [userList_service_1.UserListService, userList_model_1.UserListModel, router_1.Router])
                ], userList);
                return userList;
            }());
            exports_1("userList", userList);
        }
    }
});
//# sourceMappingURL=userList.component.js.map