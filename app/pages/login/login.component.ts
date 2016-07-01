import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './services/login.service';
import { SelectLoginModel } from '../../common/models/selectLogin.model';
import { UserModel } from '../../common/models/user.model';

@Component({
  selector: 'login',
  templateUrl: 'app/pages/login/login.html',
  styleUrls: ['app/pages/login/login.css']
})
export class Login{
  private model = {'userId':'', 'password':''};
  private userModel: UserModel;
  private userIDModel = {'userId': ''};

  constructor (
                private router: Router,
                private loginService: LoginService
              ) {}

  onSubmit() {
    console.log("page user ID, PW : " + this.model);
    //로그인 step01: ID, Password 검사 후 토큰 발행
    this.loginService.sendCredentials(this.model).subscribe(
      data => {
        let jsonToken = JSON.parse(JSON.stringify(data))._body;

        console.log("get token success!, token: " + jsonToken);
        //localStroage에 token, userID 저장
        localStorage.setItem("token", jsonToken);
        localStorage.setItem("userId", this.model.userId);

        this.userIDModel.userId = this.model.userId;

        //로그인 step02: 토큰 발행 후 사용자의 정보와 코드 데이터를 서버에서 가져옴
        this.loginService.getLoginData(this.userIDModel).subscribe(
          data => {
            console.log("get Login data : " + JSON.parse(JSON.stringify(data))._body);
            localStorage.setItem("currentUserData", JSON.parse(JSON.stringify(data))._body);

            this.userModel = JSON.parse(localStorage.getItem("currentUserData")).userModel;

            localStorage.setItem("deptCode", this.userModel.deptCode);
            localStorage.setItem("userName", this.userModel.userName);
            localStorage.setItem("rankCode", this.userModel.rankCode);
            localStorage.setItem("roleCode", this.userModel.roleCode);

            window.location.reload();

            //페이지를 메인페이지로 이동
            let link = ['/'];
            this.router.navigate(link);
          }
        ),
        error => console.log(error)
      }
    ),
    error => console.log(error)
  }

  logout(){
    this.loginService.logout();
  }
}
