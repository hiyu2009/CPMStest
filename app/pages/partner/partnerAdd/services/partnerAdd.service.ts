import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PartnerAddService {
  constructor (private http:Http) {}

  //입력한 사업자 등록 데이터, 코드를 송신
   addPartnerData(partnerModel) {
  //정해둔 사업자 등록 url로 연결
    let url = 'http://localhost:8080/partner/insert';
    let header = new Headers();

    header.append('Content-Type', 'application/json');//JSON
    header.append('Authorization', 'Bearer '+ localStorage.getItem("token")); //토큰 가져온다
    header.append('RoleCode', localStorage.getItem("roleCode") ); //각각 user의 rolecode 가져온다

    //partnerModel은 JSON 포맷 형태로 헤더에 리턴
    return this.http.post(url, JSON.stringify(partnerModel), {headers: header});
  }


}
