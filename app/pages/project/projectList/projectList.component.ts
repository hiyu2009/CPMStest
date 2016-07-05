import { Component,
         OnInit }             from '@angular/core';
import { Control,
         FORM_DIRECTIVES } from '@angular/common';
import 'rxjs/Rx';
import { Observable }        from 'rxjs/Observable';
import { Observer }          from 'rxjs/Observer';
// import { TableListComponent } from '../../../common/components/table/table-list/table-list.component';
import { ProjectListTable }   from './components/projectListTable.component';
import { LoginService }       from '../../login/services/login.service';
import { ProjectListService } from './services/projectList.service';
import { DeptCodeModel }      from '../../../common/models/deptCode.model';
import { SelectListModel }    from './models/selectList.model';

@Component ({
  selector: 'prject-list',
  directives: [ ProjectListTable ],
  // providers: [ ProjectListService ],
  templateUrl: 'app/pages/project/projectList/projectList.html'
})
export class ProjectList implements OnInit{
  private data: Observable<any>;
  private dataObserver: Observer<any>;

  private deptCodeModels: DeptCodeModel[] = [];
  private pjtListModels: SelectListModel[] = [];
  private tableHeaders: string[] = ['프로젝트 명', '매출처', '계약금액', '외주금액', '순매출', '시작일', '종료일'];
  private deptSelect: DeptCodeModel;
  private selectFilter: any;
  private searchValue: string = "";
  private searchModel: SelectListModel;

  constructor(
    private loginService:LoginService,
    private pjtListService:ProjectListService
  ){
    this.deptSelect  = new DeptCodeModel();
    this.searchModel = new SelectListModel();

    this.data = new Observable(observer => this.dataObserver = observer);
    // this.ProjectListTable = new ProjectListTable(this.tableHeaders, this.pjtListModels);
  }

  ngOnInit(){
    if(this.loginService.checkLogin()){

      //로그인 확인 후 부서목록을 가져옴
      this.deptCodeModels = JSON.parse(localStorage.getItem("currentUserData")).deptCodeModels;

      this.pjtListService.getList(this.searchModel).subscribe(
        data => {
          console.log("return data check : ");
          console.log(data);

          // this.pjtListModels = data;
          console.log("pjtListModel <- data : ");
          console.log(this.pjtListModels);

          this.dataObserver.next(data);
          console.log("data insert success! ");
          console.log(this.dataObserver);
        }, error => {
          console.log(error);
          alert("데이터를 조회 할 수 없습니다!");
          this.pjtListModels = [];
        }
      )

      console.log("projectList table-header: " + typeof this.tableHeaders);
      console.log("projectList table-row: " + typeof this.pjtListModels);
    }
  }

  //부서 리스트의 선택 값 변경 반영
  selectedDeptCode(newVlaue){
    this.deptSelect = newVlaue;
    console.log("deptCode change: " + this.deptSelect);
  }

  //구분(프로젝트명, 매출처명) 리스트의 선택 값 변경
  selectedSearchFilter(newValue) {
    this.selectFilter = newValue;
    console.log("Filter change: " + this.selectFilter);
  }

  //조회버튼 클릭시 데이터 조회
  searchData(event, selDept, selFilter){
    console.log("search start...");

    this.searchValue = event;
    this.deptSelect = selDept;
    this.selectFilter = selFilter;

    console.log("deptCode : " + this.deptSelect.deptCode + " Filter : " + this.selectFilter + " string: " + this.searchValue);

    //부서의 코드값 적용
    if(this.deptSelect && this.deptSelect != null){
      this.searchModel.deptCode = this.deptSelect.deptCode;
      console.log("search - deptCode : " + this.deptSelect.deptCode);
    }

    switch(this.selectFilter){
      case "1": //프로젝트 명
        if(this.searchValue != null){
            this.searchModel.projectName = this.searchValue;
            console.log("search - projectName : " + this.searchModel.projectName);
        }
        break;
      case "2": //매출처명
        if(this.searchValue != null){
          this.searchModel.partnerName = this.searchValue;
          console.log("search - partnerName : " + this.searchModel.partnerName);
        }
        break;
      default:
        console.log("search -default");
        break;
    }

    this.pjtListService.getList(this.searchModel).subscribe(
      data => {
        //dataObserver에 조회된 데이터를 반영해서 테이블을 리로드한다.
        this.dataObserver.next(data);
      }, error => {
        console.log(error);
        alert("데이터를 조회 할 수 없습니다!");
        this.pjtListModels = [];
      }
    )
    console.log("search end...");
  }

  searchList(){

  }
}
