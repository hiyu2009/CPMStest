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

  constructor (
                private router: Router,
                private loginService: LoginService
              ) {}

  onSubmit() {
    console.log("page user ID, PW : " + this.model);
    this.loginService.sendCredentials(this.model).subscribe(
      data => {
        let jsonToken = JSON.parse(JSON.stringify(data))._body;

        console.log("get token success!, token: " + jsonToken);
        //localStroage에
        localStorage.setItem("token", jsonToken);
        localStorage.setItem("userId", this.model.userId);
        this.loginService.getLoginData(localStorage.getItem("userId")).subscribe(
          data => {
            console.log("get Login data : " + JSON.parse(JSON.stringify(data))._body);
            localStorage.setItem("currentUserData", JSON.parse(JSON.stringify(data))._body);

            this.userModel = JSON.parse(localStorage.getItem("currentUserData")).userModel;

            localStorage.setItem("deptCode", this.userModel.deptCode);
            localStorage.setItem("userName", this.userModel.userName);
            localStorage.setItem("rankCode", this.userModel.rankCode);
            localStorage.setItem("roleCode", this.userModel.roleCode);

            window.location.reload();
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
