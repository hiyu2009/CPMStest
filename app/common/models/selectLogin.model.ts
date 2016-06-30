import { DeptCodeModel } from './deptCode.model';
import { RankCodeModel } from './rankCode.model';
import { RoleCodeModel } from './roleCode.model';
import { PartnerCodeModel } from './partnerCode.model';
import { BusinessCodeModel }  from './businessCode.model';
import { RatingCodeModel }  from './ratingCode.model';
import { OutsourcingCodeModel }  from './outsourcingCode.model';
import { UserModel }  from './user.model';
import { SelectMenuModel }  from './selectMenu.model';

export class SelectLoginModel {
    public deptCodeModels: DeptCodeModel[];
    public rankCodeModels: RankCodeModel[];
    public roleCodeModels: RoleCodeModel[];
    public partnerCodeModels: PartnerCodeModel[];
    public businessCodeModels: BusinessCodeModel[];
    public ratingCodeModels: RatingCodeModel[];
    public outsourcingCodeModels: OutsourcingCodeModel[];
    public userModel: UserModel[];
    public selectMenuModels: SelectMenuModel[];
}
