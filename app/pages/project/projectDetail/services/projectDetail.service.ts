import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProjectDetailService {
  private static SERVER_DOMAIN: string = "http://localhost:8080/";

  constructor(private http: Http) {}

  projectIdByData(pjtIDModel){
    let url = ProjectDetailService.SERVER_DOMAIN + "project/selectDetail";
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer '+ localStorage.getItem("token"));
    header.append('RoleCode', localStorage.getItem("roleCode"));

    return this.http.post(url, JSON.stringify(pjtIDModel), {headers: header});
  }
}
