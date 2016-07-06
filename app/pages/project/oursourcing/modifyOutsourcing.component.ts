import {Component, OnInit,
         ViewChild }               from '@angular/core';
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {DatePicker}               from '../../../common/components/datepicker/ng2-datepicker';
import {ModifyOutsourcingService} from './services/modifyOutsourcing.service';
import {ProjectDetailService}     from '../projectDetail/services/projectDetail.service';
import {SelectDetailModel}        from '../projectDetail/models/selectDetail.model';
import {ProjectModel}             from '../../../common/models/project.model';
import {BusinessCodeModel}        from'../../../common/models/businessCode.model';
import {RankCodeModel}            from '../../../common/models/rankCode.model';
import {OutsourcingModel}         from '../../../common/models/outsourcing.model';
import {PartnerModel}             from '../../../common/models/partner.model';


@Component({
    selector: 'outsourcing',
    templateUrl: 'app/pages/project/oursourcing/modifyOutsourcing.html',
    providers: [ModifyOutsourcingService, ProjectDetailService],
    directives: [DatePicker, MODAL_DIRECTIVES],
    styleUrls: ['app/pages/project/css/project.css']
})
export class ModifyOutsourcing implements OnInit {
    @ViewChild('modal')
    modal: ModalComponent;

    private pjtListModel:ProjectModel[];
    private pjtIdModel = {'projectId': 0};
    private outsourcingListModel:SelectDetailModel;
    // private businessCodes: BusinessCodeModel[];
    private rankCodes: RankCodeModel[];
    private addOutsourcing: OutsourcingModel;
    private searchPartnerModel: PartnerModel;
    private madalPartnerList: PartnerModel[];

    constructor(private service:ModifyOutsourcingService,
                private pjtDetailService:ProjectDetailService) {
        this.pjtListModel = [];
        this.outsourcingListModel = new SelectDetailModel();
        // this.businessCodes = JSON.parse(localStorage.getItem("currentUserData")).businessCodeModels;
        this.rankCodes = [];
        this.addOutsourcing = new OutsourcingModel();
        this.searchPartnerModel = new PartnerModel();
        // this.searchPartnerModel.businessCode = "1";
        this.madalPartnerList = [];
    }

    ngOnInit() {
        this.service.getPjtList().subscribe(
            data=> {
                this.pjtListModel = data;
            }, error => console.log("outsourcing - getPjtList error: " + error)
        )
    }

    onSearchList() {
        this.pjtDetailService.projectIdByData(this.pjtIdModel).subscribe(
            data=> {
                this.outsourcingListModel = data;
                console.log("ModifyOutSourcing get outosurcing List");
                console.log(this.outsourcingListModel);
            }, error => console.log("ModifyOutSourcing get outosurcing List error: " + error)
        )
    }

    searchPartnerOpen(){

    }

    searchPartnerDismissed(){

    }

    searchPartnerClosed(){

    }
}