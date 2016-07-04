import { Component,
         Input,
         Output,
         OnInit,
         EventEmitter }    from '@angular/core';
import { Control,
         FORM_DIRECTIVES } from '@angular/common';
import { Observable }      from 'rxjs/Observable';
// import { LoginService }    from '../../../login/services/login.service';
import { SelectListModel } from '../models/selectList.model';
// import { DeptCodeModel }   from '../../../../common/models/deptCode.model';
import { ROUTER_DIRECTIVES,
         Router }          from '@angular/router';
// import { ProjectListService } from '../services/projectList.service';

@Component({
  selector: 'project-list-table',
  directives: [ ROUTER_DIRECTIVES ],
  templateUrl: 'app/pages/project/projectList/components/projectListTable.html'
})
export class ProjectListTable implements OnInit {
  @Input('table-headers') tableHeaders: Object;
  @Input('table-rowModels') tableRowModels: Observable<any>;
  // @Input()  tableRowModels: Observable<any>
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  private searchBox:Control = new Control();

  constructor(  private router: Router
             ) {

    console.log("table-View : " + this.tableRowModels);
    this.searchBox
        .valueChanges
        .debounceTime(200)
        .subscribe((event) => this.searchEvent.emit(event));
  }


  ngOnInit(){
    console.log("table-header: " + typeof this.tableHeaders);
    console.log("table-row: " + typeof this.tableRowModels);

    // this.tableHeaders = [];
    // this.tableRowModels = [];
  }

  onRowClick(colData) {
    console.log("choice ProjectId : " + colData.projectId);
    let link = ['/project/selectDetail', colData.projectId];
    this.router.navigate(link);
  }

  onInsertClick(){
    let link = ['/project/insertProject', null];
    this.router.navigate(link);
  }
}
