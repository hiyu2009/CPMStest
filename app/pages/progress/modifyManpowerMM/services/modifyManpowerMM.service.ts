import {Injectable}             from '@angular/core';
import {Http, Headers}          from '@angular/http';
import {ManpowerModel} from "../../manpower/models/manpower.model";
import {ManpowerMMModel} from "../models/manpowerMM.model";
import {ProjectModel} from "../../../../common/models/project.model";
import {ResultModel} from "../../../../common/models/result.model";

@Injectable()
export class ModifyManpowerMMService {
    private SERVER_DOMAIN:string = "http://localhost:8080/";
    private mmModel: ManpowerMMModel[];
    private result: ResultModel;

    constructor(private http:Http) {
        this.mmModel = [];
        this.result = new ResultModel();
    }

    //선택한 프로젝트의 인력 목록을 가져옴
    getMMData(mm) {
        let url = this.SERVER_DOMAIN + "progress/selectManpowerMmList";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("ManpowerMMModel cehck", mm);

        return this.http.post(url, JSON.stringify(mm), {headers: header})
            .map((responseData) => {
                this.mmModel = responseData.json();
                console.log("ProgressManpowerService - getMMData result");
                console.log(this.mmModel);
                return this.mmModel;
            })
    }

    mergeSaveMMList(mergeModel){
        let url = this.SERVER_DOMAIN + "progress/modifyManpowerMm";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("ManpowerMMModel cehck", mergeModel);

        return this.http.post(url, JSON.stringify(mergeModel), {headers: header})
            .map((responseData) => {
                this.result = responseData.json();
                console.log("ProgressManpowerService - getMMData result");
                console.log(this.result);
                return this.result;
            })
    }
}