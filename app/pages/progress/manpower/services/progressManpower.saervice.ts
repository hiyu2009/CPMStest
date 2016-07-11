import {Injectable}             from '@angular/core';
import {Http, Headers}          from '@angular/http';
import {ManpowerModel} from "../models/manpower.model";
import {ProjectModel} from "../../../../common/models/project.model";
import {ResultModel} from "../../../../common/models/result.model";
import {ModifyManpowerModel} from "../models/modifyManpower.model";
import {SelectPartnerNameList} from "../models/selectPartnerName.model";

@Injectable()
export class ProgressManpowerService {
    private SERVER_DOMAIN:string = "http://localhost:8080/";
    private manpowerList:ManpowerModel[];
    private result: ResultModel;
    private partnerNameList: SelectPartnerNameList[];

    constructor(private http:Http) {
        this.manpowerList = [];
        this.partnerNameList = [];
        this.result = new ResultModel();
    }

    //선택한 프로젝트의 인력 목록을 가져옴
    getManpowerList(pjtModel) {
        let url = this.SERVER_DOMAIN + "progress/selectManpowerList";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("pjtModel cehck");
        console.log(pjtModel.projectId);

        return this.http.post(url, JSON.stringify(pjtModel), {headers: header})
            .map((responseData) => {
                this.manpowerList = responseData.json();
                console.log("ProgressManpowerService - getManpowerList result");
                console.log(this.manpowerList);
                return this.manpowerList;
            })
    }

    mergeSaveManpowerList(mergeModel: ModifyManpowerModel) {
        let url = this.SERVER_DOMAIN + "progress/modifyManpower";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("mergeModel cehck");
        console.log(mergeModel);

        return this.http.post(url, JSON.stringify(mergeModel), {headers: header})
            .map((responseData) => {
                this.result = responseData.json();
                console.log("ProgressManpowerService - mergeSaveManpowerList result");
                console.log(this.result);
                return this.result;
            })
    }

    getPartnerNameList(projectIdModel){
        let url = this.SERVER_DOMAIN + "progress/SelectPartnerNameList";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("projectIdModel cehck");
        console.log(projectIdModel);

        return this.http.post(url, JSON.stringify(projectIdModel), {headers: header})
            .map((responseData) => {
                this.partnerNameList = responseData.json();
                console.log("ProgressManpowerService - getPartnerNameList result");
                console.log(this.partnerNameList);
                return this.partnerNameList;
            })
    }
}