System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MenuListModel;
    return {
        setters:[],
        execute: function() {
            MenuListModel = (function () {
                function MenuListModel() {
                    this.partnerMenuList = [];
                    this.projectMenuList = [];
                    this.progressMenuList = [];
                    this.adminMenuList = [];
                }
                return MenuListModel;
            }());
            exports_1("MenuListModel", MenuListModel);
        }
    }
});
//# sourceMappingURL=menuList.model.js.map