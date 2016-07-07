import {Injectable}             from '@angular/core';
import {RatingCodeModel} from "../models/ratingCode.model";
import {DeptCodeModel} from "../models/deptCode.model";
import {RankCodeModel} from "../models/rankCode.model";
import {RoleCodeModel} from "../models/roleCode.model";
import {PartnerCodeModel} from "../models/partnerCode.model";
import {BusinessCodeModel} from "../models/businessCode.model";
import {OutsourcingCodeModel} from "../models/outsourcingCode.model";
import {UserModel} from "../models/user.model";

@Injectable()
export class CommonModelService {

    getRatingCodeList(): RatingCodeModel[] {
        let ratingList: RatingCodeModel[] = JSON.parse(localStorage.getItem("currentUserData")).ratingCodeModels;

        return ratingList;
    }

    getDeptCodeList(): DeptCodeModel[] {
        let deptList: DeptCodeModel[] = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;

        return deptList;
    }

    getRankCodeList(): RankCodeModel[] {
        let rankCodeList: RankCodeModel[] = JSON.parse(localStorage.getItem("currentUserData")).rankCodeModels;

        return rankCodeList;
    }

    getRoleCodeList(): RoleCodeModel[] {
        let roleCodeList: RoleCodeModel[] = JSON.parse(localStorage.getItem("currentUserData")).roleCodeModels;

        return roleCodeList;
    }

    getPartnerCodeList(): PartnerCodeModel[] {
        let partnerCodeList: PartnerCodeModel[] = JSON.parse(localStorage.getItem("currentUserData")).partnerCodeModels;

        return partnerCodeList;
    }

    getBusinessCodeList(): BusinessCodeModel[] {
        let businessCodeList: BusinessCodeModel[] = JSON.parse(localStorage.getItem("currentUserData")).businessCodeModels;

        return businessCodeList;
    }

    getOutsourcingCodeList(): OutsourcingCodeModel[] {
        let outsourcingCodeList: OutsourcingCodeModel[] = JSON.parse(localStorage.getItem("currentUserData")).outsourcingCodeModels;

        return outsourcingCodeList;
    }

    getUserCodeList(): UserModel[] {
        let userCodeList: UserModel[] = JSON.parse(localStorage.getItem("currentUserData")).userModel;

        return userCodeList;
    }
}