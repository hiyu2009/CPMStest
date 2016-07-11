import {Component, OnInit} from '@angular/core';
import {ProjectModel} from "../../../common/models/project.model";
import {ManpowerModel} from "../manpower/models/manpower.model";
import {ManpowerMMModel} from "./models/manpowerMM.model";
import {ModifyOutsourcingService} from "../../project/oursourcing/services/modifyOutsourcing.service";
import {InlineEditComponent} from "../../../common/components/inline-edit/inline-edit.component";
import {ProgressManpowerService} from "../manpower/services/progressManpower.saervice";
import {ModifyManpowerMMService} from "./services/modifyManpowerMM.service";
import {ProjectDetailService} from "../../project/projectDetail/services/projectDetail.service";
import {SelectDetailModel} from "../../project/projectDetail/models/selectDetail.model";
import {ModifyManpowerMmModel} from "./models/modifyManpowerMM.model";
import {ResultModel} from "../../../common/models/result.model";
import * as moment_ from 'moment';

const moment: moment.MomentStatic = (<any>moment_)['default'] || moment_;

@Component({
    selector: 'modify-manpowerMM',
    templateUrl: 'app/pages/progress/modifyManpowerMM/modifyManpowerMM.html',
    directives: [InlineEditComponent],
    providers: [ModifyOutsourcingService, ModifyManpowerMMService, ProgressManpowerService, ProjectDetailService]
})
export class ModifyManpowerMM implements OnInit {

    // private moment: moment_;

    private pjtListModels:ProjectModel[];              //프로젝트 리스트
    private manpowerListModels:ManpowerModel[];        //프로젝트에 대한 투입인력 리스트
    private selDataModel = {"projectId": 0, "manpowerMm": ""};              //선택한 프로젝트, 투입인력의 정보를 저장
    private mmMergeListModel: ModifyManpowerMmModel;
    private selPjtInfo:SelectDetailModel;              //조회시 선택한 프로젝트의 정보
    private selManpowerInfo:ManpowerModel;             //조회시 선택한 투입인력의 정보
    private toggleSearch: boolean;                    //조회 여부

    constructor(private modifyProjectService:ModifyOutsourcingService,
                private progressManpowerService:ProgressManpowerService,
                private modifyManpowerMMService:ModifyManpowerMMService,
                private projectDetailService:ProjectDetailService) {
        this.pjtListModels = [];
        this.manpowerListModels = [];
        this.selPjtInfo = new SelectDetailModel();
        this.selManpowerInfo = new ManpowerModel();
        this.mmMergeListModel = new ModifyManpowerMmModel();

        this.toggleSearch = false;
    }

    ngOnInit() {
        //선택할 프로젝트 목록을 서버로부터 가져옴

        this.modifyProjectService.getPjtList().subscribe(
            data => {
                this.pjtListModels = data;
            }
        )
    }
    
    //프로젝트 선택시 부서 목록을 가져옴
    onSearchManpower(value) {
        this.selDataModel.projectId = value;

        console.log(this.selDataModel.projectId + " selected!");

        this.progressManpowerService.getManpowerList(this.selDataModel).subscribe(
            data => {
                this.manpowerListModels = data;
            }
        )
    }

    //조회
    onSearch() {
        console.log(this.selDataModel);
        
        //선택한 데이터의 MM 목록을 가져옴
        this.modifyManpowerMMService.getMMData(this.selDataModel).subscribe(
            data => {
                this.mmMergeListModel.mergeManpowerMmModels = data;
            }
        )
        
        //선택한 프로젝트의 정보를 가져옴
        this.projectDetailService.projectIdByData(this.selDataModel).subscribe(
            data => {
                this.selPjtInfo = data;
            }
        )

        //선택한 인력의 데이터를 가져옴
        this.progressManpowerService.getManpowerList(this.selDataModel).subscribe(
            data => {
                this.selManpowerInfo = data[0];
            }
        )

        this.toggleSearch = true;
    }

    pushMMList(){
        let tempMM = new ManpowerMMModel();

        tempMM.projectId = this.selDataModel.projectId;
        tempMM.manpowerName = this.selDataModel.manpowerMm;
        tempMM.mm = 0;

        let lastDate = this.mmMergeListModel.mergeManpowerMmModels[this.mmMergeListModel.mergeManpowerMmModels.length-1].month;

        let formatDate = moment(lastDate).format("YYYY-MM-DD");
        // console.log("new MM Add: lastDate: ", formatDate);

        let lastDateStr = formatDate.toString().split("-");
        let dateNum:number[] = [];
        // dateNum.push(+lastDateStr[0]);
        // dateNum.push((+lastDateStr[1]));

        dateNum.push(+lastDateStr[2]);
        // console.log("new MM Add : dateNum: ", dateNum);

        let date = new Date(dateNum[0], dateNum[1], dateNum[2]);

        // console.log("new MM Add :  check formatDate: " + date);

        tempMM.month = date;

        this.mmMergeListModel.mergeManpowerMmModels.push(tempMM);
        console.log("123123123123=-------------");
        console.log("new MM Add: ", this.mmMergeListModel.mergeManpowerMmModels);
    }

    onSave(){
        this.modifyManpowerMMService.mergeSaveMMList(this.mmMergeListModel).subscribe(
            data => {
                let result:ResultModel = data;
                
                if(result.result){
                    alert("저장을 완료했습니다.");
                    this.mmMergeListModel.deleteManpowerMmModels = [];
                }else{
                    alert("저장에 실패했습니다.");
                }
            }
        )
    }

    deleteData(delModel){
        this.mmMergeListModel.deleteManpowerMmModels.push(delModel);
        this.mmMergeListModel.mergeManpowerMmModels.splice(this.mmMergeListModel.mergeManpowerMmModels.indexOf(delModel),1);
    }

    saveEditable(event){

    }
}