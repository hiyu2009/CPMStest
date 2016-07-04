import { Component } from '@angular/core';
import { PartnerModel } from '../../../common/models/partner.model';
import { PartnerCodeModel } from '../../../common/models/partnerCode.model';
import { BusinessCodeModel } from '../../../common/models/businessCode.model';
import { ResultModel } from '../../../common/models/result.model';

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
  private model = { 'partner ID':'', 'businessNumber':'' }
  private partnerModel : PartnerModel = new PartnerModel();

  private partnerCodeModels : PartnerCodeModel[];
  private businessCodeModels : BusinessCodeModel[];


  private resultModel : ResultModel;

  constructor( private partnerAddService : PartnerAddService){

    this.partnerCodeModels = JSON.parse(localStorage.getItem("currentUserData")).partnerCodeModels;
    this.businessCodeModels = JSON.parse(localStorage.getItem("currentUserData")).businessCodeModels;


  };

//4가지 등록 정보 입력 후 데이터들을 배열 형태로 넘길수 있게 맵핑
  onSubmit() {
    //alert(JSON.stringify(this.partnerModel));
      this.partnerAddService.getPartnerData(this.partnerModel).subscribe(
        //통신의 유무만 확인
        data => {
          this.resultModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);
          if(this.resultModel.result){
            console.log("성공");
          }
          else{
            console.log("실패" + this.resultModel.message);

          }

        }
      ),
      error => console.log(error);
      }


}
