import { Component } from '@angular/core';
import { PartnerModel } from '../../../common/models/partner.model';
// import { PartnerCodeModel } from '../../../common/models/partnerCode.model';
import { PartnerAddService } from './services/partnerAdd.service';

import { ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

@Component({
  selector: 'partner-add',
  templateUrl: 'app/pages/partner/partnerAdd/partnerAdd.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers:[ PartnerAddService ],
  styleUrls: ['./app/pages/partner/css/partner.css']
})
export class PartnerAdd {
  private model = { 'partnerId':'', 'businessNumber':'', 'businessCode':'', 'partnerCode':'' }
  private partnerModel : PartnerModel;

  constructor( private partnerAddService : PartnerAddService){

  }


  
  onSubmit() {
    console.log("page partner ID, businessNumber, : " + this.model);
    this.partnerAddService.sendCredentials(this.model).subscribe(
      data => {
        let jsonToken = JSON.parse(JSON.stringify(data))._body;

        console.log("get token success!, token: " + jsonToken);
        //localStroage에
        localStorage.setItem("token", jsonToken);
        localStorage.setItem("partnerId", this.model.partnerId);
        this.partnerAddService.getPartnerData(localStorage.getItem("partnerId")).subscribe(
          data => {
            console.log("get Partner data : " + JSON.parse(JSON.stringify(data))._body);
            localStorage.setItem("currentUserData", JSON.parse(JSON.stringify(data))._body);

            this.partnerModel = JSON.parse(localStorage.getItem("currentUserData")).partnerModel;
            // this.PartnerCodeModel = JSON.parse(localStorage.getItem("currentUserData")).partnerCodeModels;

            // for(let partner of this.PartnerModel){
            //   console.log(partnerCode.pescription);
            // }

            // localStorage.setItem("partnerId", this.partnerModel.partnerId);
            // localStorage.setItem("businessNumber", this.partnerModel.businessNumber);
            localStorage.setItem("businessCode", this.partnerModel.businessCode);
            localStorage.setItem("partnerCode", this.partnerModel.partnerCode);
          }
        ),
        error => console.log(error)
      }
    ),
    error => console.log(error)
  }
}
