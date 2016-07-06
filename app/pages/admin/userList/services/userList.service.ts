import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserListService {
  private SERVER_DOMAIN: string = "http://localhost:8080/";

  constructor(private http: Http) {}

  selectUserList(userListModel){
    let url = this.SERVER_DOMAIN + "admin/selectUserList";
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer '+ localStorage.getItem("token"));
    header.append('RoleCode', localStorage.getItem("roleCode"));

    return this.http.post(url, JSON.stringify(userListModel), {headers: header});
  }
}
