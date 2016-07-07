import {Injectable}             from '@angular/core';
import {Http, Headers}          from '@angular/http';
import {ProjectModel}           from '../../../../common/models/project.model';
import {SelectOutSourcingModel} from '../models/selectOutsourcing.model';
import {PartnerModel}           from '../../../../common/models/partner.model';
import {ModifyOutsourcingModel} from '../models/modifiyOutsourcingModel.model';
import {ResultModel}            from '../../../../common/models/result.model';

@Injectable()
export class ModifyOutsourcingService {
    private SERVER_DOMAIN:string = "http://localhost:8080/";
    private pjtListModel:ProjectModel[];
    private outsourcingList:SelectOutSourcingModel[];
    private partnerModel:PartnerModel[];
    private result:ResultModel;

    constructor(private http:Http) {
        this.pjtListModel = [];
        this.outsourcingList = [];
        this.partnerModel = [];
        this.result = new ResultModel();
    }

    //프로젝트 목록을 가져옴
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

    //선택한 프로젝트의 외주 인력의 리스트 목록을 가져옴
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

    //사업자 조회시 입력한 이름의 사업자들의 목록을 가져옴
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

    //저장버튼 클릭시 수정한 데이터를 저장한
    mergeOutsourcing(mergeModel:ModifyOutsourcingModel) {
        let url = this.SERVER_DOMAIN + "project/modifyOutsourcing";

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        alert(JSON.stringify(mergeModel));

        console.log("mergeModel cehck");
        console.log(mergeModel);

        return this.http.post(url, JSON.stringify(mergeModel), {headers: header})
            .map((responseData) => {
                this.result = responseData.json();
                console.log("ModifyOutsourcingService - mergeOutsourcing result");
                console.log(this.result);
                return this.result;
            })
    }

    // checkAddOutsourcing(addOutsourcing: SelectOutSourcingModel){
// }
}