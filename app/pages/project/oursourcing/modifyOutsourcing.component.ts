import {Component, OnInit, ViewChild}       from '@angular/core';
import {InlineEditComponent}                from '../../../common/components/inline-edit/inline-edit.component';
import {DatePicker}                         from '../../../common/components/datepicker/ng2-datepicker';
import {ROUTER_DIRECTIVES, Router}          from '@angular/router';
import {MODAL_DIRECTIVES, ModalComponent}   from 'ng2-bs3-modal/ng2-bs3-modal';
import {ProjectModel}                       from '../../../common/models/project.model';
import {ModifyOutsourcingService}           from './services/modifyOutsourcing.service';
import {SelectOutSourcingModel}             from './models/selectOutsourcing.model';
import {PartnerCodeModel}                   from '../../../common/models/partnerCode.model';
import {RatingCodeModel}                    from '../../../common/models/ratingCode.model';
import {PartnerModel}                       from '../../../common/models/partner.model';
import {ModifyOutsourcingModel}             from './models/modifiyOutsourcingModel.model';
import {ResultModel}                        from '../../../common/models/result.model';

@Component({
    selector: 'modify-outsourcing',
    templateUrl: 'app/pages/project/oursourcing/modifyOutsourcing.html',
    providers: [ModifyOutsourcingService],
    directives: [ROUTER_DIRECTIVES, InlineEditComponent, DatePicker, MODAL_DIRECTIVES],
})
export class ModifyOutsourcing implements OnInit {
    @ViewChild('addModal')
    private modal: ModalComponent;

    private projectList:ProjectModel[];                      //Project select list data
    // private outsourcingList:SelectOutSourcingModel[];        //Outsourcing list data
    private partnerCodeListModel: PartnerCodeModel[];        //PartnerCode select list data
    private ratingListModel: RatingCodeModel[];              //LatingCode select list data
    private selProject:ProjectModel;                         //Project select list target model
    private addOutsourcingModel: SelectOutSourcingModel;     //add Outsourcing modal target model;
    private selOutsourcing: SelectOutSourcingModel;          //Outsourcing list select data
    private partnerNameModel: PartnerModel;                  //Partner modal input text target model
    private searchPartnerModel: PartnerModel[];              //Partner modal list target model
    private selPartner: PartnerModel;                        //Partner modal choice target model
    private choiceRowIndex: number = -1;                    //List에서 선택된 array의 값
    // private deleteOutdourcingList: SelectOutSourcingModel[]; //삭제 배열
    private modifyOutsourcingModel: ModifyOutsourcingModel;  //merge 배멸

    private modifyResult: ResultModel;

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;


    constructor(private service:ModifyOutsourcingService) {
        this.projectList = [];
        this.partnerCodeListModel = [];
        this.ratingListModel = [];
        this.searchPartnerModel = [];
        this.modifyOutsourcingModel = new ModifyOutsourcingModel();
        this.selProject = new ProjectModel();
        this.addOutsourcingModel = new SelectOutSourcingModel();
        this.selOutsourcing = new SelectOutSourcingModel();
        this.partnerNameModel = new PartnerModel();
        this.selPartner = new PartnerModel();
        this.modifyResult = new ResultModel();
        this.selProject.projectId = 0;
        this.partnerNameModel.businessCode = "2";
        this.partnerNameModel.partnerName = "";
    }

    ngOnInit() {
        this.partnerCodeListModel = JSON.parse(localStorage.getItem("currentUserData")).partnerCodeModels;
        this.ratingListModel = JSON.parse(localStorage.getItem("currentUserData")).ratingCodeModels;

        this.service.getPjtList().subscribe(
            data => {
                this.projectList = data;
                console.log("Success Get Project LIst data");
                console.log(this.projectList);
            }, error => console.log("ModifyOutsourcing get projectList error : " + error)
        )
    }

    onSearchOutsourcing() {
        this.service.findOutsourcingList(this.selProject).subscribe(
            data => {
                this.modifyOutsourcingModel.mergeOutsourcingModels = data;
            }, error => console.log("ModifyOutsourcing onSearchOutsourcing error : " + error)
        )
    }

    searchPartner() {
        this.service.partnerSearchByName(this.partnerNameModel).subscribe(
            data=>{
                this.searchPartnerModel = data;
            }
        )
    }

    partnerRowClick(partnerModel: PartnerModel){
        this.selPartner = partnerModel;
    }

    selDeptModalOpen(){
        console.log("selDeptModalOpen!");
        if(this.selOutsourcing != null){
            this.setChoiceArray(this.selOutsourcing);
        }
    }
    
    //사업자 검색 Modal을 닫을시
    selDeptModalClose(){
        console.log("selDeptModalClose!");
        if(this.choiceRowIndex >= 0){
            //리스트에서 선택해서 접근했을시
            this.modifyOutsourcingModel.mergeOutsourcingModels[this.choiceRowIndex].partnerId = this.selPartner.partnerId;
            this.modifyOutsourcingModel.mergeOutsourcingModels[this.choiceRowIndex].partnerName = this.selPartner.partnerName;
            this.modifyOutsourcingModel.mergeOutsourcingModels[this.choiceRowIndex].partnerCode = this.selPartner.partnerCode;
            this.choiceRowIndex = -1;
        }else{
            //추가에서 접근했을시
            console.log(this.selPartner);
            this.addOutsourcingModel.partnerId = this.selPartner.partnerId;
            this.addOutsourcingModel.partnerName = this.selPartner.partnerName;
            this.addOutsourcingModel.partnerCode = this.selPartner.partnerCode;
            console.log(this.addOutsourcingModel);
        }

        this.selOutsourcing = new SelectOutSourcingModel();
        this.selPartner = new PartnerModel();
        this.partnerNameModel = new PartnerModel();
    }

    addModalOpen() {
        this.addOutsourcingModel.startDate = null;
        this.addOutsourcingModel.endDate = null;
        this.addOutsourcingModel.outsourcingAmount = null;
        this.addOutsourcingModel.outsourcingCode = null;
        this.addOutsourcingModel.partnerId = null;
        this.addOutsourcingModel.partnerName = null;
        this.addOutsourcingModel.product = null;
        this.addOutsourcingModel.projectId = null;
        this.addOutsourcingModel.ratingCode = null;
    }

    addModalClose() {
        console.log("addModalClose!");
        console.log(this.addOutsourcingModel);

        console.log(this.modifyOutsourcingModel.mergeOutsourcingModels);
        this.addOutsourcingModel.projectId = this.selProject.projectId;
        this.modifyOutsourcingModel.mergeOutsourcingModels.push(this.addOutsourcingModel);
        console.log(this.modifyOutsourcingModel.mergeOutsourcingModels);

        this.addOutsourcingModel = new SelectOutSourcingModel();
    }

    deleteData(model: SelectOutSourcingModel){
        console.log(model.partnerName + "delete start");
        console.log(this.modifyOutsourcingModel.mergeOutsourcingModels);
        this.modifyOutsourcingModel.deleteOutsourcingModels.push(model);
        this.modifyOutsourcingModel.mergeOutsourcingModels.splice(this.modifyOutsourcingModel.mergeOutsourcingModels.indexOf(model),1);
        console.log(this.modifyOutsourcingModel.mergeOutsourcingModels);
        console.log(model.partnerName + "delete end");
    }

    onSaveData() {
        this.service.mergeOutsourcing(this.modifyOutsourcingModel).subscribe(
            data=>{
                let result:ResultModel = data;
                if(result.result){
                    alert("저장 되었습니다.");
                }else{
                    alert("저장에 실패했습니다.")
                }
            }
        )
    }

    saveEditable(value){
        alert("saveEditable 호출");
    }

    dismissed() {
    }

    opened() {
    }

    navigate() {
    }

    open() {
        this.modal.open();
    }

    setChoiceArray(selModel) {
        this.choiceRowIndex = this.modifyOutsourcingModel.mergeOutsourcingModels.indexOf(selModel);
    }
}
