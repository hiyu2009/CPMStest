import { Component } from '@angular/core';

import { TableListComponent } from '../../../common/components/table/table-list/table-list.component';
import { LoginService } from '../../login/services/login.service';
import { ProjectListService } from './services/projectList.service';
import { DeptCodeModel } from '../../../common/models/deptCode.model';
import { SelectListModel } from './models/selectList.model';

@Component ({
  selector: 'prject-list',
  directives: [ TableListComponent ],
  // providers: [ ProjectListService ],
  templateUrl: 'app/pages/project/projectList/projectList.html'
})
export class ProjectList {
  private deptCodeModels: DeptCodeModel[] = [];
  private pjtListModels: SelectListModel[] = [];
  private tableHeaders: string[] = ['프로젝트 명', '매출처', '계약금액', '외주금액', '순매출', '시작일', '종료일'];
  private deptSelect:DeptCodeModel;
  private selectFilter: any;
  private searchValue: string = "";
  private searchModel: SelectListModel;

  constructor(
    private loginService:LoginService,
    private pjtListService:ProjectListService
  ){
    this.searchModel = new SelectListModel();
    this.deptSelect  = new DeptCodeModel();
    this.searchModel = new SelectListModel();

    if(loginService.checkLogin()){

      //로그인 확인 후 부서목록을 가져옴
      this.deptCodeModels = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;

      this.pjtListService.getList(this.searchModel).subscribe(
        data => {
          console.log(JSON.stringify(data));
          this.pjtListModels = JSON.parse(JSON.parse(JSON.stringify(data))._body);
          console.log("data insert success!");
        }, error => console.log(error)
      )
    }
  }

  //부서 리스트의 선택 값 변경 반영
  selectedDeptCode(newVlaue){
    this.deptSelect = newVlaue;
    console.log("deptCode change: " + this.deptSelect);
  }

  //부서 리스트의 선택 값 변경
  selectedSearchFilter(newValue) {
    this.selectFilter = newValue;
    console.log("Filter change: " + this.selectFilter);
  }

  onRowClick(colData) {

  }

  searchData(){
    console.log("search start...");

    //부서의 코드값 적용
    if(this.deptSelect && this.deptSelect != null){
      this.searchModel.deptCode = this.deptSelect.deptCode;
      console.log("search - deptCode : " + this.searchModel.deptCode);
    }

    switch(this.searchValue){
      case "프로젝트명":
        if(this.searchValue != null){
            this.searchModel.projectName = this.searchValue;
            console.log("search - projectName : " + this.searchModel.projectName);
        }
        break;
      case "매출처":
        if(this.searchValue != null){
          this.partnerName.projectName = this.searchValue;
          console.log("search - projectName : " + this.partnerName.projectName);
        }
        break;
    }

    console.log("search end...");
  }
}
