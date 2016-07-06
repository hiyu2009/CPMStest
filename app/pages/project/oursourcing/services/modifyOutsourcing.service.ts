import {Injectable}        from '@angular/core';
import {Http, Headers}     from '@angular/http';
import {ProjectModel} from '../models/selectDetail.model';
import {OutsourcingModel} from '../../../../common/models/outsourcing.model';

@Injectable()
export class OutsourcingManagerService {
    private SERVER_DOMAIN:string = "http://localhost:8080/";
    private pjtListModel: ProjectModel[];
    private outsourcingList: OutsourcingModel[];

    constructor(private http:Http) {
        this.pjtListModel = [];
        this.outsourcingList = [];
    }

    getPjtList() {
        let url = this.SERVER_DOMAIN + "project/selectDetail";
        let model = {"deptCode": localStorage.getItem("deptCode")};

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));


        return this.http.post(url, JSON.stringify(model), {headers: header})
            .map((responseData) => {
                this.pjtListModel = responseData.json();
                console.log("ProjectDetailService - getPjtList result");
                console.log(this.pjtListModel);
                return this.pjtListModel;
            })
    }
}