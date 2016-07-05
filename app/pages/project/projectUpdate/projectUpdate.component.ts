import {
    Component,
    OnInit
}                              from '@angular/core';
import {
    Router,
    ActivatedRoute,
    ROUTER_DIRECTIVES
}                              from '@angular/router';

import {DatePicker}           from '../../../common/components/datepicker/ng2-datepicker';

import {ProjectDetailService} from '../projectDetail/services/projectDetail.service';
import {ProjectUpdateService} from './services/projectUpdate.service';
import {LoginService}         from '../../login/services/login.service';

import {ProjectModel}         from '../../../common/models/project.model';
import {SelectDetailModel}    from '../projectDetail/models/selectDetail.model';
import {PartnerCodeModel}     from '../../../common/models/partnerCode.model';
import {ResultModel}          from '../../../common/models/result.model';

@Component({
    selector: 'project-update',
    templateUrl: 'app/pages/project/projectUpdate/projectUpdate.html',
    directives: [DatePicker, ROUTER_DIRECTIVES],
    providers: [ProjectDetailService, ProjectUpdateService],
    styleUrls: ['app/pages/project/css/project.css', 'app/pages/project/projectUpdate/projectUpdate.css']
})
export class ProjectUpdate implements OnInit {
    private sub:any = null;
    private pjtUpdateModel:ProjectModel;
    private detailModel:SelectDetailModel;
    private partnerListModel:PartnerCodeModel[];

    constructor(private route:ActivatedRoute,
                private router:Router,
                private getDataService:ProjectDetailService,
                private service:ProjectUpdateService,
                private loginService:LoginService) {
        this.pjtUpdateModel = new ProjectModel();
        this.detailModel = new SelectDetailModel();
        this.partnerListModel = [];
    }

    ngOnInit() {
        if (this.loginService.checkLogin()) {
            //매출처 데이터를 가져옴
            this.service.getDeptCode().subscribe(
                data => {
                    this.partnerListModel = data;
                    console.log("get partnerList Success!!");
                    console.log(this.partnerListModel);
                }, error => console.log("ProjectAdd - ngOnInit getPartnerList Error : " + error)
            )
            
            //수정할 프로젝트 데이터를 가져옴
            this.sub = this.route.params.subscribe(params => {
                this.pjtUpdateModel.projectId = +params['id']; // (+) converts string 'id' to a number
                this.getDataService.projectIdByData(this.pjtUpdateModel).subscribe(
                    data => {
                        this.detailModel = data;


                        this.pjtUpdateModel = this.detailModel.projectModel;
                        console.log("update.get ");
                        console.log(this.pjtUpdateModel);
                    }, error => console.log(error)
                );
            });
        }
    }

    onSubmit() {
        let result: ResultModel = new ResultModel();

        this.service.modifyData(this.pjtUpdateModel).subscribe(
            data => {
                result = data;
                if(result.result){
                    alert("수정이 완료되었습니다.");

                    let link = ['/project/selectList'];
                    this.router.navigate(link);
                }else{
                    alert("수정에 실패했습니다.");
                }
            }
        )
    }

    onDelData() {
        let result: ResultModel = new ResultModel();
        
        this.service.deleteData(this.pjtUpdateModel).subscribe(
            data => {
                result = data;
                if(result.result){
                    alert("삭제가 완료되었습니다.");

                    let link = ['/project/selectList'];
                    this.router.navigate(link);
                }else{
                    alert("삭제가 실패했습니다.");
                }
            }
        )
    }
}