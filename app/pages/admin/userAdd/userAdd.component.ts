import { Component } from '@angular/core';

import { ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

//사용자 등록에 필요한 모델 import 정의
import { UserModel } from '../../../common/models/user.model';
import { DeptCodeModel } from '../../../common/models/deptCode.model';
import { RankCodeModel } from '../../../common/models/rankCode.model';
import { RoleCodeModel } from '../../../common/models/roleCode.model';
// import { ModifyDeptCodeModel } from '../../common/models/modifyDeptCode.model';
// import { SelectUserModel } from '../../common/models/selectUser.model';
import { ResultModel } from '../../../common/models/result.model';

import { UserAddService } from './services/userAdd.service';


@Component({
  selector: 'user-add',
  templateUrl: 'app/pages/admin/userAdd/userAdd.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers:[ UserAddService ],
  styleUrls: ['./app/pages/admin/css/admin.css']
})
export class UserAdd{

  //UserModel 변수 정의하고 값을 가지고 올 new 객체 생성
  private userModel: UserModel = new UserModel();
  //각각의 partnerCodeModels,businessCodeModels는 select에서 뿌려지는 형태는 배열로 뿌려진다
  //배열 부분의 model에는 주로 -s를 붙혀서 정의 : 모델[];
  private deptCodeModels : DeptCodeModel[];
  private rankCodeModels : RankCodeModel[];
  private roleCodeModels : RoleCodeModel[];
  //서버로 넘겨줄 데이터들을 Result 모델을 생성해주고 선언해준다.
  private resultModel : ResultModel;

  //서버와의 통신을 위한 service파일
  constructor( private userAddService : UserAddService){

    //currentUser의 partnerCodeModel과 businessCodeModel데이터들을 서버로 JSON 형태로 포맷해서 보낸다
    this.deptCodeModels = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;
    this.rankCodeModels = JSON.parse(localStorage.getItem("currentUserData")).rankCodeModels;
    this.roleCodeModels = JSON.parse(localStorage.getItem("currentUserData")).roleCodeModels;

  };

//4가지 등록 정보 입력 후 등록 버튼을 누르면서 데이터들을 JSON 포맷 형태로 넘길수 있게 맵핑
  onSubmit() {
      this.userAddService.addUserData(this.userModel).subscribe(
        data =>{
          this.resultModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);
          if(this.resultModel.result){
            console.log("성공");
            //result boolean true/false
          }
          else{
            console.log("실패" + this.resultModel.message);

          }
        }
    )
  }
}
