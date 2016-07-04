import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectDetailService } from './services/projectDetail.service';
import { SelectDetailModel } from './models/selectDetail.model';

@Component ({
  selector: 'project-detail',
  templateUrl: 'app/pages/project/projectDetail/projectDetail.html'
})
export class ProjectDetail implements OnInit{
  private sub: any;
  private pjtIDModel = {'projectId': ''};
  private pjtDetailModel: SelectDetailModel;

  constructor(
   private route: ActivatedRoute,
   private router: Router,
   private service: ProjectDetailService) {
     this.pjtDetailModel = new SelectDetailModel();
   }

   ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
       this.pjtIDModel.projectId = params['id']; // (+) converts string 'id' to a number
       this.service.projectIdByData(this.pjtIDModel).subscribe(
         data => {
           console.log("detail.get " + JSON.parse(JSON.parse(JSON.stringify(data))._body));
           this.pjtDetailModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);
         }, error => console.log(error)
       );
     });


    // this.pjtIDModel.projectId = this.route.params;
    //
    // if(this.pjtIDModel != null ){
    //   console.log("param ProjectId: " + this.pjtIDModel.projectId);
    //   //  let id = +params['id']; // (+) converts string 'id' to a number
    //   this.service.projectIdByData(this.pjtIDModel).subscribe(
    //     data => {
    //       console.log("detail.get " + JSON.parse(JSON.parse(JSON.stringify(data))._body));
    //       this.pjtDetailModel = JSON.parse(JSON.parse(JSON.stringify(data))._body);
    //     }, error => console.log(error)
    //   );
    // }
  }
}
