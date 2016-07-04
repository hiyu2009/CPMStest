import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
// import { PartnerModel } from '../../../../common/models/partner.model';
// import { PartnerCodeModel } from '../../../../common/models/partnerCode.model';
// import { BusinessCodeModel } from '../../../../common/models/businessCode.model';
// import { ResultModel } from '../../../common/models/result.model';

@Injectable()
export class PartnerAddService {

  token: string;
  private partnerNameModel = {'partnerName':''}

  constructor (private http:Http) {}
  //
  // sendCredentials(model) {
  //   let tokenUrl = 'http://localhost:8080/partner/selectList';
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //
  //   console.log(headers);
  //
  //   return this.http.post(tokenUrl, JSON.stringify(model), {headers: headers});
  // }

  //입력한 사업자 등록 데이터, 코드를 송신
  getPartnerData(partnerModel) {
    let url = 'http://localhost:8080/partner/insert';
    let header = new Headers();

// let header = new Headers ({
//   'Content-Type' : 'application/json',
//   'Authorization': 'Bearer '+localStorage.getItem("token"),
//   'RoleCode':localStorage.getItem("roleCode")});

    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer '+ localStorage.getItem("token"));
    header.append('RoleCode', localStorage.getItem("roleCode") );


    return this.http.post(url, JSON.stringify(partnerModel), {headers: header});
  }

  
}
