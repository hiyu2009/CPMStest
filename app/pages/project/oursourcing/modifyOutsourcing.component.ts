import {Component, OnInit, ViewChild} from '@angular/core';
import {InlineEditComponent} from '../../../common/components/inline-edit/inline-edit.component';
import {DatePicker} from '../../../common/components/datepicker/ng2-datepicker';
import {ROUTER_DIRECTIVES, Router}          from '@angular/router';
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {ProjectModel} from '../../../common/models/project.model';
import {ModifyOutsourcingService} from './services/modifyOutsourcing.service';
import {SelectOutSourcingModel} from './models/selectOutsourcing.model';
import {BusinessCodeModel} from '../../../common/models/businessCode.model';
import {RatingCodeModel} from '../../../common/models/ratingCode.model';
import {PartnerModel} from '../../../common/models/partner.model';

@Component({
    selector: 'modify-outsourcing',
    templateUrl: 'app/pages/project/oursourcing/modifyOutsourcing.html',
    providers: [ModifyOutsourcingService],
    directives: [ROUTER_DIRECTIVES, InlineEditComponent, DatePicker, MODAL_DIRECTIVES],
})
export class ModifyOutsourcing implements OnInit {
    @ViewChild('addModal')
    private modal: ModalComponent;

    private projectList:ProjectModel[];
    private outsourcingList:SelectOutSourcingModel[];
    private bussinessListModel: BusinessCodeModel[];
    private ratingListModel: RatingCodeModel[];
    private selProject:ProjectModel;
    private addOutsourcingModel: SelectOutSourcingModel;
    private selOutsourcing: SelectOutSourcingModel;
    private partnerNameModel: PartnerModel;
    private searchPartnerModel: PartnerModel[];
    private selPartner: PartnerModel;

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;


    constructor(private service:ModifyOutsourcingService) {
        this.projectList = [];
        this.outsourcingList = [];
        this.bussinessListModel = [];
        this.ratingListModel = [];
        this.searchPartnerModel = [];
        this.selProject = new ProjectModel();
        this.addOutsourcingModel = new SelectOutSourcingModel();
        this.selOutsourcing = new SelectOutSourcingModel();
        this.partnerNameModel = new PartnerModel();
        this.selPartner = new PartnerModel();
        this.selProject.projectId = 0;
        this.partnerNameModel.businessCode = "1";
    }

    ngOnInit() {
        this.bussinessListModel = JSON.parse(localStorage.getItem("currentUserData")).businessCodeModels;
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
                this.outsourcingList = data;
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

    selDeptModalOpen(outsourcing){
        console.log("selDeptModalOpen!");

    }

    selDeptModalClose(){
        console.log("selDeptModalClose!");
    }

    addModalClose() {
        console.log("addModalClose!");
    }

    saveEditable(value){
        alert("saveEditable 호출");
    }

    deleteData(){

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

}
