import { Component, OnInit }                  from '@angular/core';

import { ROUTER_DIRECTIVES }                  from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES }   from '@angular/common';
//사용자 등록에 필요한 모델 import 정의
import { UserModel }                          from '../../../common/models/user.model';
import { DeptCodeModel }                      from '../../../common/models/deptCode.model';
import { RankCodeModel }                      from '../../../common/models/rankCode.model';
import { RoleCodeModel }                      from '../../../common/models/roleCode.model';
import { ResultModel }                        from '../../../common/models/result.model';
//서버와의 통신에 필요한 Service 파일
import { UserUpdateService }                  from './services/userUpdate.service';

@Component({
  selector: 'user-update',
  templateUrl: 'app/pages/admin/userUpdate/userUpdate.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers:[ UserUpdateService ],
  styleUrls: ['./app/pages/admin/css/admin.css']
})

//implements 선언 (상속) 인터페이스를 위한 (중복 감소)
export class UserUpdate implements OnInit{
  private userModel : UserModel = new UserModel();

  private deptCodeModels : DeptCodeModel[];
  private rankCodeModels : RankCodeModel[];
  private roleCodeModels : RoleCodeModel[];

  private resultModel : ResultModel;

  private userIdModel = {'userId': ''};
  private userId : string = "test11";

      constructor( private userUpdateService : UserUpdateService ){
        this.deptCodeModels = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;
        this.rankCodeModels = JSON.parse(localStorage.getItem("currentUserData")).rankCodeModels;
        this.roleCodeModels = JSON.parse(localStorage.getItem("currentUserData")).roleCodeModels;

  };
  ngOnInit(){
    this.userIdModel.userId = this.userId;
    // console.log(typeof(this.userModel.userId));
    this.userUpdateService.getUserData(this.userIdModel).subscribe(
        data => {
          this.userModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);
        }

    ), error => console.log(error);

  };

  onSubmit(){
    this.userUpdateService.getUpdateUserData(this.userModel).subscribe(
        data => {
          this.resultModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);

          if(this.resultModel.result){
            console.log("성공");
          }
          else{
            console.log("실패" + this.resultModel.message);

          }
        }
    ),
        error => console.log(error);
  };
}
