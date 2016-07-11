import {Injectable}             from '@angular/core';
import {Http, Headers}          from '@angular/http';
import {ManpowerModel} from "../../manpower/models/manpower.model";
import {ManpowerMMModel} from "../models/manpowerMM.model";
import {ProjectModel} from "../../../../common/models/project.model";

@Injectable()
export class ModifyManpowerMMService {
    private SERVER_DOMAIN:string = "http://localhost:8080/";
    private manpowerListModels: ManpowerModel[];
    private mmModel: ManpowerMMModel[];

    constructor(private http:Http) {
        this.manpowerListModels = [];
        this.mmModel = [];
    }

    //선택한 프로젝트의 인력 목록을 가져옴
    getMMData(mm: ManpowerMMModel) {
        let url = this.SERVER_DOMAIN + "progress/selectManpowerList";

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
    
    
}