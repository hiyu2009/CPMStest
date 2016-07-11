import {Component, OnInit} from '@angular/core';
import {ProjectModel} from "../../../common/models/project.model";
import {ManpowerModel} from "../manpower/models/manpower.model";
import {ManpowerMMModel} from "./models/manpowerMM.model";
import {ModifyOutsourcingService} from "../../project/oursourcing/services/modifyOutsourcing.service";
import {ProgressManpowerService} from "../manpower/services/progressManpower.saervice";
import {ModifyManpowerMMService} from "./services/modifyManpowerMM.service";
import {ProjectDetailService} from "../../project/projectDetail/services/projectDetail.service";
import {SelectDetailModel} from "../../project/projectDetail/models/selectDetail.model";

@Component({
    selector: 'modify-manpowerMM',
    templateUrl: 'app/pages/progress/modifyManpowerMM/modifyManpowerMM.html',
    providers: [ModifyOutsourcingService, ModifyManpowerMMService, ProgressManpowerService, ProjectDetailService]
})
export class ModifyManpowerMM implements OnInit {
    private pjtListModels:ProjectModel[];              //프로젝트 리스트
    private manpowerListModels:ManpowerModel[];        //프로젝트에 대한 투입인력 리스트
    private selDataModel:ManpowerMMModel;              //선택한 프로젝트, 투입인력의 정보를 저장
    private mmModels:ManpowerMMModel[];                //수정할 데이터
    private selPjtInfo:SelectDetailModel;              //조회시 선택한 프로젝트의 정보
    private selManpowerInfo:ManpowerModel;             //조회시 선택한 투입인력의 정보
    private toggleSearch: boolean;


    constructor(private modifyProjectService:ModifyOutsourcingService,
                private progressManpowerService:ProgressManpowerService,
                private modifyManpowerMMService:ModifyManpowerMMService,
                private projectDetailService:ProjectDetailService) {
        this.pjtListModels = [];
        this.manpowerListModels = [];
        this.mmModels = [];
        this.selDataModel = new ManpowerMMModel();
        this.selPjtInfo = new SelectDetailModel();
        this.selManpowerInfo = new ManpowerModel();

        this.toggleSearch = false;
    }

    ngOnInit() {
        this.modifyProjectService.getPjtList().subscribe(
            data => {
                this.pjtListModels = data;
            }
        )
    }

    onSearchManpower(value) {
        this.selDataModel.projectId = value;

        console.log(this.selDataModel.projectId + " selected!");

        this.progressManpowerService.getManpowerList(this.selDataModel).subscribe(
            data => {
                this.manpowerListModels = data;
            }
        )
    }

    onSeletedManpower(value) {


        let pjtIDModel: ProjectModel = new ProjectModel();
        pjtIDModel.projectId = value;

        this.progressManpowerService.getManpowerList(pjtIDModel).subscribe(
            data => {
                this.selManpowerInfo = data[0];
            }
        )
    }

    onSearch() {
        this.modifyManpowerMMService.getMMData(this.selDataModel).subscribe(
            data => {
                this.mmModels = data;
            }
        )

        this.projectDetailService.projectIdByData(this.selDataModel).subscribe(
            data => {
                this.selPjtInfo = data;
            }
        )

        this.progressManpowerService.getManpowerList(this.selDataModel).subscribe(
            data => {
                this.selManpowerInfo = data[0];
            }
        )

        this.toggleSearch = true;
    }
}