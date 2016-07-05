import {Component, OnInit}      from '@angular/core';
import {Router, ActivatedRoute,
         ROUTER_DIRECTIVES}      from '@angular/router';
import {ProjectDetailService}   from './services/projectDetail.service';
import {SelectDetailModel}      from './models/selectDetail.model';
import {ProjectModel}           from '../../../common/models/project.model';

@Component({
    selector: 'project-detail',
    providers: [ProjectDetailService],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/pages/project/projectDetail/projectDetail.html',
    styleUrls: ['app/pages/project/css/project.css', 'app/pages/project/projectDetail/projectDetail.css']
})
export class ProjectDetail implements OnInit {
    private sub:any = null;
    private pjtIDModel:ProjectModel;
    private pjtDetailModel:SelectDetailModel;
    private userDeptCode: string;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private service:ProjectDetailService) {

        this.pjtDetailModel = new SelectDetailModel();
        this.pjtIDModel = new ProjectModel();
        this.userDeptCode = localStorage.getItem('deptCode');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.pjtIDModel.projectId = +params['id']; // (+) converts string 'id' to a number
            this.service.projectIdByData(this.pjtIDModel).subscribe(
                data => {
                    this.pjtDetailModel = data;
                    console.log("detail.get ");
                    console.log(this.pjtDetailModel);
                }, error => console.log(error)
            );
        });
    }

    goToModify() {
        console.log("click modify button" + this.pjtDetailModel.projectModel.projectId);
        let link = ['/project/updateProject', this.pjtDetailModel.projectModel.projectId];
        this.router.navigate(link);
    }
}
