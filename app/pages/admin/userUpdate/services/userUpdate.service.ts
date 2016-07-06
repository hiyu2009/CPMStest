import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserUpdateService {
    constructor (private http:Http) {}

    getUserData(userModel){
        let url = 'http://localhost:8080/admin/selectUserDetail';
        let header = new Headers();

        header.append('Content-Type', 'application/json');//JSON
        header.append('Authorization', 'Bearer '+ localStorage.getItem("token")); //토큰 가져온다
        header.append('RoleCode', localStorage.getItem("roleCode") ); //각각 user의 rolecode 가져온다

        return this.http.post(url, JSON.stringify(userModel), {headers: header});
    }

    getUpdateUserData(userModel) {
        let url = 'http://localhost:8080/admin/updateUser';
        let header = new Headers();

        header.append('Content-Type', 'application/json');//JSON
        header.append('Authorization', 'Bearer '+ localStorage.getItem("token")); //토큰 가져온다
        header.append('RoleCode', localStorage.getItem("roleCode") ); //각각 user의 rolecode 가져온다

        return this.http.post(url, JSON.stringify(userModel), {headers: header});
    }



}
