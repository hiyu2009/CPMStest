import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { SelectListModel } from '../models/selectList.model';

@Injectable()
export class ProjectListService {
  private SERVER_DOMAIN: string = "http://localhost:8080/";
  private result: SelectListModel[];

  constructor(private http: Http) {
    this.result = [];
  }

  //등록된 프로젝트의 목록을 가져옴
  getList(selectModel: SelectListModel) {
    let url = this.SERVER_DOMAIN + "project/selectList";
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer '+ localStorage.getItem("token"));
    header.append('RoleCode', localStorage.getItem("roleCode"));

    return this.http.post(url, JSON.stringify(selectModel), {headers: header})
          .map( (responseData) => {
            this.result = responseData.json();
            console.log("projectList.services result");
            console.log(this.result);
            return this.result;
          })
  }

}
