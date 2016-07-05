import {Injectable}        from '@angular/core';
import {Http, Headers}     from '@angular/http';
import {SelectDetailModel} from '../models/selectDetail.model';

@Injectable()
export class ProjectDetailService {
    private SERVER_DOMAIN:string = "http://localhost:8080/";
    private result:SelectDetailModel;

    constructor(private http:Http) {
        this.result = new SelectDetailModel();
    }

    projectIdByData(pjtIDModel) {
        let url = this.SERVER_DOMAIN + "project/selectDetail";
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        return this.http.post(url, JSON.stringify(pjtIDModel), {headers: header})
            .map((responseData) => {
                this.result = responseData.json();
                console.log("ProjectDetailService - projectIdByData result");
                console.log(this.result);
                return this.result;
            })
    }
}
