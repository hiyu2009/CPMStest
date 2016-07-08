import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
    private ROLE_CODE:string = "4";

    token:string;
    private userIdModel = {'userId': ''};

    constructor(private http:Http, private router:Router) {
    }

    //아이디, 비밀번호 확인 후 토큰 송신
    sendCredentials(model) {
        let tokenUrl = 'http://localhost:8080/main/login';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        console.log(headers);

        return this.http.post(tokenUrl, JSON.stringify(model), {headers: headers});
    }

    //사용자의 권한에 따른 데이터, 코드를 송신
    getLoginData(model) {
        let url = 'http://localhost:8080/main/selectLogin';
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', this.ROLE_CODE);

        console.log(model.userId);

        return this.http.post(url, JSON.stringify(model), {headers: header});

        // let url="http://localhost:8080/rest/photo/user";
        // let header = new Headers ({'Content-Type' : 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
        //
        // return this.http.post(url, JSON.stringify(user), {headers: header});
    }

    checkLogin() {
        if (localStorage.getItem("userId") != "" && localStorage.getItem("token") != "") {
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
    }
}
