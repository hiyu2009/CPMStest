import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { PartnerCodeModel }     from '../../../../common/models/partnerCode.model';
import { ResultModel }   from '../../../../common/models/result.model';
import { ProjectModel }  from '../../../../common/models/project.model';

@Injectable()
export class ProjectAddService {
    private SERVER_DOMAIN: string = "http://localhost:8080/";
    private partnerList: PartnerCodeModel[];
    private result: ResultModel;
    private startDate: any;

    constructor(private http: Http) {
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
        header.append('Authorization', 'Bearer '+ localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));


        return this.http.post(url, JSON.stringify(model), {headers: header})
                     .map( (responseData) => {
                         this.partnerList = responseData.json();
                         console.log("ProjectAddService - getDeptCode result");
                         console.log(this.partnerList);
                         return this.partnerList;
                     })
    }

    //입력된 프로젝트의 데이터를 테이블에 insert
    addProjectData(addPjtModel: ProjectModel) {
        let url = this.SERVER_DOMAIN + "project/insertProject";
        let header = new Headers();

        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ localStorage.getItem("token"));
        header.append('RoleCode', localStorage.getItem("roleCode"));

        console.log("ProjectAdd - addProjectData: insert data check");
        console.log(typeof addPjtModel.outsourcingAmount);
        console.log(typeof addPjtModel.contractAmount);

        return this.http.post(url, JSON.stringify(addPjtModel), {headers: header})
                    .map( (responseData) => {
                        this.result = responseData.json();
                        console.log("ProjectAddService - addProjectData result");
                        console.log(this.result);
                        return this.result;
                    })
    }

    valueCheckData(addPjtModel: ProjectModel): boolean {
        let checkData = addPjtModel;
        
        if(checkData.startDate == null && checkData.endDate == null) {
            console.log("projectAdd - valueCheckData: startDate or endData is null!");
            return false;
        } else if(checkData.outsourcingAmount >  checkData.contractAmount) {
            return false;
        } else if(checkData.supplyAmount > checkData.contractAmount) {
            return false;
        } else if(checkData.vtaAmount > checkData.contractAmount) {
            return false;
        }

        return true;
    }
}