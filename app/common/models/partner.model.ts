import { DeptCodeModel } from './deptCode.model';
//BusinessCodeModel와 PartnerCodeModel들 import 해서 참조
import { PartnerCodeModel } from './partnerCode.model';
import { BusinessCodeModel } from './businessCode.model';


export class PartnerModel{
  public partnerId: number; //DB에서 자동으로 생성
  public partnerName: string;
  public partnerCode: string;
  public businessNumber: number;
  public businessCode : string;
  public createDate : number; //DB에서 자동으로 생성
}
