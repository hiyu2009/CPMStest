import {Component, OnInit, ViewChild} from '@angular/core';
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {DatePicker} from "../../../common/components/datepicker/ng2-datepicker";
import {ModifyOutsourcingService} from "../../project/oursourcing/services/modifyOutsourcing.service";
import {ProjectModel} from "../../../common/models/project.model";
import {ManpowerModel} from "./models/manpower.model";
import {ProgressManpowerService} from "./services/progressManpower.saervice";
import {InlineEditComponent} from "../../../common/components/inline-edit/inline-edit.component";
import {RatingCodeModel} from "../../../common/models/ratingCode.model";
import {CommonModelService} from "../../../common/services/commonModel.services";
import {ModifyManpowerModel} from "./models/modifyManpower.model";
import {SelectPartnerNameList} from "./models/selectPartnerName.model";
import {ResultModel} from "../../../common/models/result.model";

@Component({
    selector: 'progress-manpwer',
    templateUrl: 'app/pages/progress/manpower/progressManpower.html',
    directives: [InlineEditComponent, MODAL_DIRECTIVES, DatePicker],
    providers: [ModifyOutsourcingService, ProgressManpowerService]
})
export class ProgressManpwer implements OnInit {
    @ViewChild('modal')
    private modal: ModalComponent;

    private pjtListModels:ProjectModel[];                    //현재 사용자의 부서의 프로젝트 목록을 가져온다.
    private selPjtModel:ProjectModel;                        //프로젝트 목록에서 선택 후 조회한 프로젝트의 ID를 저장
    private manpowerListModels:ManpowerModel[];              //선택한 프로젝트의 인력의 목록을 저장
    private ratingListModels: RatingCodeModel[];             //개발등급목록
    private addManpowerModel: ManpowerModel;                 //추가 인력목록
    private modifyManpowerModel: ModifyManpowerModel;        //인력목록 리스트, 삭제리스트
    private partnerNameListModel: SelectPartnerNameList[];   //사업자 이름 목록 리스트
    private resultModel: ResultModel;                        //결과모델

    constructor(private  service:ProgressManpowerService,
                private  modifyService:ModifyOutsourcingService,
                private  commonModelService: CommonModelService) {
        this.pjtListModels = [];
        this.manpowerListModels = [];
        this.partnerNameListModel = [];
        this.ratingListModels = this.commonModelService.getRatingCodeList();
        this.selPjtModel = new ProjectModel();
        this.addManpowerModel = new ManpowerModel();
        this.modifyManpowerModel = new ModifyManpowerModel();
        this.resultModel = new ResultModel();
    }

    ngOnInit() {
        this.modifyService.getPjtList().subscribe(
            data => {
                this.pjtListModels = data;
            }
        )
    }

    onSearchManpower() {
        this.service.getManpowerList(this.selPjtModel).subscribe(
            data => {
                this.modifyManpowerModel.mergeManpowerModels = data;
            }
        )

        this.service.getPartnerNameList(this.selPjtModel).subscribe(
            data => {
                this.partnerNameListModel = data;
            }
        )
    }

    onSaveData() {
        this.service.mergeSaveManpowerList(this.modifyManpowerModel).subscribe(
            data => {
                this.resultModel = data;
                if(this.resultModel.result){
                    alert("저장이 완료되었습니다.");
                }else{
                    alert("저장에 실패했습니다.");
                }
            }
        )
    }

    deleteData(delModel: ManpowerModel){
        this.modifyManpowerModel.deleteManpowerModels.push(delModel);
        this.modifyManpowerModel.mergeManpowerModels.splice(this.modifyManpowerModel.mergeManpowerModels.indexOf(delModel),1);
    }

    opened(){
        this.addManpowerModel.projectId = null;
        this.addManpowerModel.manpowerName = "";
        this.addManpowerModel.partnerId = null;
        this.addManpowerModel.ratingCode = "";
        this.addManpowerModel.sellingAmount = null;
        this.addManpowerModel.outsourcingAmount = null
        this.addManpowerModel.startDate = null;
        this.addManpowerModel.endDate = null;
    }

    dismissed(){

    }

    saveEditable(value){
    }

    closeed(){
        this.addManpowerModel.projectId = this.selPjtModel.projectId;
        this.modifyManpowerModel.mergeManpowerModels.push(this.addManpowerModel);

        this.addManpowerModel = new ManpowerModel();
    }

    open() {
        this.modal.open();
    }
}