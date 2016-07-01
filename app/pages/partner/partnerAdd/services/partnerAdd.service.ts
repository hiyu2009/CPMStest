import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import { PartnerModel } from '../../../../common/models/partner.model';

@Injectable()
export class PartnerAddService {
  token: string;
  private partnerIdModel = {'partnerId':''}

  constructor (private http:Http) {}

  sendCredentials(model) {
    let tokenUrl = 'http://localhost:8080/partner/selectList';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log(headers);

    return this.http.post(tokenUrl, JSON.stringify(model), {headers: headers});
  }

  getPartnerData(partnerId: string) {
    let url = 'http://localhost:8080/partner/insert';
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer '+ localStorage.getItem("token"));

    console.log(header);
    console.log(partnerId);

    return this.http.post(url, partnerId, {headers: header});

    // let url="http://localhost:8080/rest/photo/user";
    // let header = new Headers ({'Content-Type' : 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    //
    // return this.http.post(url, JSON.stringify(user), {headers: header});
  }
}
