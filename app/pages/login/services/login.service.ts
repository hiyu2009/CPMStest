import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
  token: string;
  private userIdModel = {'userId' : ''};

  constructor (private http:Http) {}

  sendCredentials(model) {
    let tokenUrl = 'http://localhost:8080/main/login';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log(headers);

    return this.http.post(tokenUrl, JSON.stringify(model), {headers: headers});
  }

  getLoginData(userId: string) {
    let url = 'http://localhost:8080/main/selectLogin';
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer '+ localStorage.getItem("token"));

    console.log(header);
    console.log(userId);

    return this.http.post(url, userId, {headers: header});

    // let url="http://localhost:8080/rest/photo/user";
    // let header = new Headers ({'Content-Type' : 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    //
    // return this.http.post(url, JSON.stringify(user), {headers: header});
  }

  checkLogin() {
    if (localStorage.getItem("userId")!="" && localStorage.getItem("token")!="") {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    // localStorage.setItem("token", "");
    // localStorage.setItem("currentUserData", "");
    // localStorage.setItem("deptCode", "");
    // localStorage.setItem("rankCode", "");
    // localStorage.setItem("roleCode", "");

    localStorage.clear();

    alert("You just logged out.");
  }
}
