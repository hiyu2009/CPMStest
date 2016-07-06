import {Component} from '@angular/core';
import {UserListModel} from './models/userList.model';
import {UserListService} from './services/userList.service'
import { ROUTER_DIRECTIVES, Router }          from '@angular/router';
import {InlineEditComponent} from '../../../common/components/inline-edit/inline-edit.component'
import { RankCodeModel } from '../../../common/models/rankCode.model';
import { DeptCodeModel } from '../../../common/models/deptCode.model';
import { RoleCodeModel } from '../../../common/models/roleCode.model';


@Component({
    selector: 'selectUserList',
    providers: [UserListService, UserListModel, RankCodeModel],
    directives: [ROUTER_DIRECTIVES, InlineEditComponent],
    templateUrl: 'app/pages/admin/userList/userList.html'
})
export class userList {
    private UserListModels: UserListModel[] = [];
    private rankCodeModels: RankCodeModel[];
    private deptCodeModels: DeptCodeModel[];
    private roleCodeModels: RoleCodeModel[];


    constructor(
        private userListService: UserListService,
        private userListModel: UserListModel,
        private router: Router
    ) {

        this.userListService.selectUserList(this.userListModel).subscribe(
            data => {
                this.UserListModels = JSON.parse(JSON.parse(JSON.stringify(data))._body);
                // this.UserListModels = JSON.parse(JSON.stringify(data))._body;
                console.log("userList selectUserList 연동 성공 : ");
            }, error => { console.log("userList error : " + error); }
        );

        this.rankCodeModels = JSON.parse(localStorage.getItem("currentUserData")).rankCodeModels;
        this.deptCodeModels = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;
        this.roleCodeModels = JSON.parse(localStorage.getItem("currentUserData")).roleCodeModels;
        //alert(JSON.stringify(this.rankCodeModels));

    } // 생성자끝
    onRowClick(event, id) {
        //alert(JSON.stringify(UserListModel));
        //let link = ['/project/selectDetail', colData.projectId];
        // let link = ['/admin/selectUserDetail', UserListModel.userId];
        // this.router.navigate(link);

    }
    onChange(){

      alert(" onChange 호출");

    }

    saveEditable(value){
          alert("saveEditable 호출");
    }

}
