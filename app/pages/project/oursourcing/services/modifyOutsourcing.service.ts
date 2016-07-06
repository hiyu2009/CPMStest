import {Injectable}             from '@angular/core';
import {Http, Headers}          from '@angular/http';
import {ProjectModel}           from '../../../../common/models/project.model';
import {SelectOutSourcingModel} from '../models/selectOutsourcing.model';
import {PartnerModel}           from '../../../../common/models/partner.model';

@Injectable()
export class ModifyOutsourcingService {
    private SERVER_DOMAIN:string = "http://localhost:8080/";
    private pjtListModel: ProjectModel[];
    private outsourcingList: SelectOutSourcingModel[];
    private partnerModel: PartnerModel[];

    constructor(private http:Http) {
        this.pjtListModel = [];
        this.outsourcingList = [];
        this.partnerModel = [];
    }

    getPjtList() {
        let url = this.SERVER_DOMAIN + "project/selectProjectList";
        let model = {"deptCode": localStorage.getItem("deptCode")};

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("deptCode cehck");
        console.log(model);

        return this.http.post(url, JSON.stringify(model), {headers: header})
            .map((responseData) => {
                this.pjtListModel = responseData.json();
                console.log("ModifyOutsourcingService - getPjtList result");
                console.log(this.pjtListModel);
                return this.pjtListModel;
            })
    }

    findOutsourcingList(projectModel) {
        let url = this.SERVER_DOMAIN + "project/selectOutsourcingList";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("projectModel cehck");
        console.log(projectModel.projectId);

        return this.http.post(url, JSON.stringify(projectModel), {headers: header})
            .map((responseData) => {
                this.outsourcingList = responseData.json();
                console.log("ModifyOutsourcingService - findOutsourcingList result");
                console.log(this.outsourcingList);
                return this.outsourcingList;
            })
    }

    partnerSearchByName(partnerModel) {
        let url = this.SERVER_DOMAIN + "main/selectPartner";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("partnerModel cehck");
        console.log(partnerModel.partnerName);

        return this.http.post(url, JSON.stringify(partnerModel), {headers: header})
            .map((responseData) => {
                this.partnerModel = responseData.json();
                console.log("ModifyOutsourcingService - partnerSearchByName result");
                console.log(this.partnerModel);
                return this.partnerModel;
            })
    }
}