import {Component, OnInit} from '@angular/core';
import {
    ROUTER_DIRECTIVES,
    Router
}            from '@angular/router';
import {ProjectModel}      from  '../../../common/models/project.model';
import {PartnerCodeModel}  from '../../../common/models/partnerCode.model';
import {ProjectAddService} from './services/projectAdd.services';
import {LoginService}      from '../../login/services/login.service';
import {DatePicker}        from '../../../common/components/datepicker/ng2-datepicker';
import {ResultModel}       from '../../../common/models/result.model';

@Component({
    selector: 'project-insert',
    templateUrl: 'app/pages/project/projectAdd/projectAdd.html',
    directives: [DatePicker, ROUTER_DIRECTIVES],
    providers: [ProjectAddService],
    styleUrls: ['./app/pages/project/css/project.css', 'app/pages/project/projectAdd/projectAdd.css']
})
export class ProjectAdd implements OnInit {
    private addPjtModel:ProjectModel;
    private partnerListModel:PartnerCodeModel[];
    private submitToggle:boolean;
    private insertResult:ResultModel;

    constructor(private pjtAddService:ProjectAddService,
                private loginService:LoginService,
                private router:Router) {
        this.addPjtModel = new ProjectModel();
        this.partnerListModel = [];
        this.submitToggle = false;
        this.insertResult = new ResultModel();

        this.addPjtModel.deptCode = localStorage.getItem("deptCode");
    }

    ngOnInit() {
        if (this.loginService.checkLogin()) {
            //매출처 데이터를 가져옴
            this.pjtAddService.getDeptCode().subscribe(
                data => {
                    this.partnerListModel = data;
                    console.log("get partnerList Success!!");
                    console.log(this.partnerListModel);
                }, error => console.log("ProjectAdd - ngOnInit getPartnerList Error : " + error)
            )
        }
    }

    onSubmit() {
        this.submitToggle = true;

        if (this.pjtAddService.valueCheckData(this.addPjtModel)) {
            this.pjtAddService.addProjectData(this.addPjtModel).subscribe(
                data => {
                    this.insertResult = data;
                    alert("등록이 완료 되었습니다.");

                    let link = ['/project/selectList'];
                    this.router.navigate(link);
                }
            )
            return true;
        } else {
            return false;
        }

        // console.log("insertReult");
        // console.log(this.insertResult);
        //
        // if(this.insertResult.result){
        //     alert("등록이 완료되었습니다.");
        // }else{
        //     alert(this.insertResult.message);
        // }
    }
}