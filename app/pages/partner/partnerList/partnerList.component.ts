/**
 * Created by seokyoon on 2016-07-06.
 */
import { Component, OnInit }             from '@angular/core';
import 'rxjs/Rx';
import { Observable }                      from 'rxjs/Observable';
import { Observer }                        from 'rxjs/Observer';

import { PartnerListTable }       from './components/partnerListTable.component';
import { LoginService }       from '../../login/services/login.service';
import { PartnerListService } from './services/partnerList.service';

import { PartnerCodeModel }      from '../../../common/models/partnerCode.model';
import { BusinessCodeModel }      from '../../../common/models/businessCode.model';

import { SelectListModel }    from './models/selectList.model';

@Component({
    selector: 'partner-list',
    directives: [ PartnerListTable ],
    providers: [ PartnerListService ],
    templateUrl: 'app/pages/partner/partnerList/partnerList.html'
})

export class PartnerList implements OnInit{
    private data:Observable<any>;
    private dataObserver:Observer<any>;

    private partnerCodeModels : PartnerCodeModel[];
    private businessCodeModels : BusinessCodeModel[];
    private prtListModels : SelectListModel[];

    private tableHeaders:string[] = ['사업자 명', '사업자 번호', '등록 분류', '사업자 구분'];

    private partnerSelect : PartnerCodeModel;
    private businessSelect : BusinessCodeModel;

    // private selectFilter:any;
    private searchValue:string = "";
    private searchModel:SelectListModel;

    constructor(
        private loginService:LoginService,
        private prtListService:PartnerListService) {

        this.partnerSelect = new PartnerCodeModel();
        this.businessSelect = new BusinessCodeModel();
        this.searchModel = new SelectListModel();

        this.partnerCodeModels = [];
        this.businessCodeModels = [];
        this.prtListModels = [];

        this.data = new Observable(observer => this.dataObserver = observer);
    }
    ngOnInit(){
        if (this.loginService.checkLogin()) {

            //로그인 확인 후 사업자,거래 목록을 가져옴
            this.partnerCodeModels = JSON.parse(localStorage.getItem("currentUserData")).partnerCodeModels;
            this.businessCodeModels = JSON.parse(localStorage.getItem("currentUserData")).businessCodeModels;

            this.prtListService.getList(this.searchModel).subscribe(
                data => {
                    console.log("return data check : ");
                    console.log(data);

                    this.prtListModels = data;
                    console.log("pjtListModel <- data : ");
                    console.log(this.prtListModels);

                    this.dataObserver.next(this.prtListModels);
                    console.log("data insert success! ");
                    console.log(this.dataObserver);
                }, error => {
                    console.log(error);
                    alert("데이터를 조회 할 수 없습니다!");
                    this.prtListModels = [];
                }
            )

            console.log("partnerList table-header: " + typeof this.tableHeaders);
            console.log("partnerList table-row: " + typeof this.prtListModels);
        }
    }
    //사업자 리스트의 선택 값 변경 반영
    selectedPartnerCode(newVlaue) {
        this.partnerSelect = newVlaue;
        console.log("partnerCode change: " + this.partnerSelect);
    }

    //구분(매출처, 매입처) 리스트의 선택 값 반영
    selectedBusinessCode(newVlaue) {
        this.businessSelect = newVlaue;
        console.log("businessCode change: " + this.businessSelect);
    }

    // selectedSearchFilter(newValue) {
    //     this.selectFilter = newValue;
    //     console.log("Filter change: " + this.selectFilter);
    // }

    //조회 버튼 클릭시 데이터 조회
    searchData(event){
        console.log("search start...");
        this.searchValue = event;

        console.log("partnerCode : " + this.partnerSelect.partnerCode + " businessCode : " + this.businessSelect.businessCode + " string: " + this.searchValue);

        //사업자 코드값 적용
        if (this.partnerSelect && this.partnerSelect != null) {
            if (+this.partnerSelect.partnerCode > 0) {
                this.searchModel.partnerCode = this.partnerSelect.partnerCode;
                console.log("search - partnerCode : " + this.partnerSelect.partnerCode);
            } else {
                this.searchModel.partnerCode = null;
                console.log("search - partnerCode : " + this.partnerSelect.partnerCode);
            }
        }
        console.log("param value (searchModel.partnerCode : " + this.searchModel.partnerCode + ")");

        //거래 코드값 적용
        if (this.businessSelect && this.businessSelect != null) {
            if (+this.businessSelect.businessCode > 0) {
                this.searchModel.businessCode = this.businessSelect.businessCode;
                console.log("search - businessCode : " + this.businessSelect.businessCode);
            } else {
                this.searchModel.businessCode = null;
                console.log("search - businessCode : " + this.businessSelect.businessCode);
            }
        }
        console.log("param value (searchModel.businessCode : " + this.searchModel.businessCode + ")");
        // switch (this.businessCode) {
        //     case "1": //매출처 명
        //         if (this.searchValue != null) {
        //             this.searchModel.projectName = this.searchValue;
        //             console.log("search - projectName : " + this.searchModel.business);
        //         }
        //         break;
        //     case "2": //매입처 명
        //         if (this.searchValue != null) {
        //             this.searchModel.partnerName = this.searchValue;
        //             console.log("search - partnerName : " + this.searchModel.partnerName);
        //         }
        //         break;
        //     default:
        //         console.log("search -default");
        //         break;
        // }

        this.prtListService.getList(this.searchModel).subscribe(
            data => {
                //dataObserver에 조회된 데이터를 반영해서 테이블을 리로드한다.
                this.prtListModels = data;
                this.dataObserver.next(this.prtListModels);
            }, error => {
                console.log(error);
                this.prtListModels = [];
            }
        )
        console.log("search end...");

    }
}
