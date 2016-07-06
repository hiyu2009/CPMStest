import { Component } from '@angular/core';

import { ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
//PartnerModel
import { PartnerModel } from '../../../common/models/partner.model';
//BusinessCodeModel와 PartnerCodeModel를 받아 select 선택 요소 모델을 정의해준다
import { PartnerCodeModel } from '../../../common/models/partnerCode.model';
import { BusinessCodeModel } from '../../../common/models/businessCode.model';
import { ResultModel } from '../../../common/models/result.model';
//서버와의 통신에 필요한 Service 파일
import { PartnerAddService } from './services/partnerAdd.service';


@Component({
  selector: 'partner-add',
  templateUrl: 'app/pages/partner/partnerAdd/partnerAdd.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers:[ PartnerAddService ],
  styleUrls: ['./app/pages/partner/css/partner.css']
})
export class PartnerAdd {

  //partnerModel 변수 정의하고 값을 가지고 올 new 객체 생성
  private partnerModel : PartnerModel = new PartnerModel();
  //각각의 partnerCodeModels,businessCodeModels는 select에서 뿌려지는 형태는 배열로 뿌려진다
  //배열 부분의 model에는 주로 -s를 붙혀서 정의 : 모델[];
  private partnerCodeModels : PartnerCodeModel[];
  private businessCodeModels : BusinessCodeModel[];

  //서버로 넘겨줄 데이터들을 Result 모델을 생성해주고 선언해준다.
  private resultModel : ResultModel;

  //서버와의 통신을 위한 service파일
  constructor( private partnerAddService : PartnerAddService){

    //currentUser의 partnerCodeModel과 businessCodeModel데이터들을 서버로 JSON 형태로 포맷해서 보낸다
    this.partnerCodeModels = JSON.parse(localStorage.getItem("currentUserData")).partnerCodeModels;
    this.businessCodeModels = JSON.parse(localStorage.getItem("currentUserData")).businessCodeModels

  };

//4가지 등록 정보 입력 후 등록 버튼을 누르면서 데이터들을 JSON 포맷 형태로 넘길수 있게 맵핑
  onSubmit() {
    // 등록 버튼을 눌렀을때 partnerAddService의 getPartnerData함수의 객체 모델인 partnerModel
    //partnerModel이 import 하는 result모델에서 등록 성공 /실패 여부 확인
      this.partnerAddService.addPartnerData(this.partnerModel).subscribe(


        //통신의 유무만 확인(프론트단과 백단쪽이 통신이 이루어지고 있는지만)
        data => {
          this.resultModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);

          // if else문을 통해 값들이 백단에 등록이 됐는지 여부를 확인해 준다.
          if(this.resultModel.result){
            console.log("성공");
            //result boolean true/false
          }
          else{
            console.log("실패" + this.resultModel.message);

          }

        }
      ),
      error => console.log(error);
      }


}
