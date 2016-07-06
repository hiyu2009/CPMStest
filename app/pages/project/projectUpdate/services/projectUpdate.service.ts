import {Injectable}        from '@angular/core';
import {Http, Headers}     from '@angular/http';
import {ResultModel}       from '../../../../common/models/result.model';
import {PartnerCodeModel}  from '../../../../common/models/partnerCode.model';
import {ProjectModel}      from '../../../../common/models/project.model';

@Injectable()
export class ProjectUpdateService {
    private SERVER_DOMAIN:string = "http://localhost:8080/";
    private partnerList:PartnerCodeModel[];
    private result:ResultModel;

    constructor(private http:Http) {
        this.partnerList = [];
        this.result = new ResultModel();
    }

    //2016.07.05 임시메소드 - 매출처의 목록을 가져오는 메소드
    //partner List 페이지 생성시 그곳에 있는 services 파일의 메소드로 대체 예정
    getDeptCode() {
        let url = this.SERVER_DOMAIN + "partner/selectList";
        let header = new Headers();
        let model = {'businessCode': '2'};

        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));


        return this.http.post(url, JSON.stringify(model), {headers: header})
            .map((responseData) => {
                this.partnerList = responseData.json();
                console.log("ProjectUpdateService - getDeptCode result");
                console.log(this.partnerList);
                return this.partnerList;
            })
    }

    modifyData(projectModel: ProjectModel) {
        let url = this.SERVER_DOMAIN + "project/updateProject";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));


        return this.http.post(url, JSON.stringify(projectModel), {headers: header})
            .map((responseData) => {
                this.result = responseData.json();
                console.log("ProjectUpdateService - modifyData result");
                console.log(this.result);
                return this.result;
            })
    }

    deleteData(projectModel: ProjectModel) {
        let url = this.SERVER_DOMAIN + "project/deleteProject";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));


        return this.http.post(url, JSON.stringify(projectModel), {headers: header})
            .map((responseData) => {
                this.result = responseData.json();
                console.log("ProjectUpdateService - deleteData result");
                console.log(this.result);
                return this.result;
            })
    }
}