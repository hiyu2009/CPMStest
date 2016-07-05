import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter
}                              from '@angular/core';
import {
    Control,
    FORM_DIRECTIVES
}                              from '@angular/common';
import {Observable}           from 'rxjs/Observable';
import {
    ROUTER_DIRECTIVES,
    Router
}                              from '@angular/router';
import {ProjectUpdateService} from '../../projectUpdate/services/projectUpdate.service'
import {ResultModel}          from '../../../../common/models/result.model';
import {of} from "rxjs/observable/of";
@Component({
    selector: 'project-list-table',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProjectUpdateService],
    templateUrl: 'app/pages/project/projectList/components/projectListTable.html'
})
export class ProjectListTable implements OnInit {
    @Input('table-headers') tableHeaders:Object;
    @Input('table-rowModels') tableRowModels:Observable<any>;
    @Output() searchEvent:EventEmitter<any> = new EventEmitter();

    private searchBox:Control = new Control();
    private userDeptCode:string;

    constructor(private router:Router,
                private  delService:ProjectUpdateService) {
        this.userDeptCode = localStorage.getItem('deptCode');

        this.searchBox
            .valueChanges
            .debounceTime(200)
            .subscribe((event) => this.searchEvent.emit(event));

    }


    ngOnInit() {
        console.log("table-header: " + typeof this.tableHeaders);
        console.log("table-row: " + typeof this.tableRowModels);
    }

    onRowClick(colData) {
        console.log("choice ProjectId : " + colData.projectId);
        let link = ['/project/selectDetail', colData.projectId];
        this.router.navigate(link);
    }

    onInsertClick() {
        console.log("projectTable.component.ts : insertBtn click!");
        let link = ['/project/insertProject'];
        this.router.navigate(link);
    }

    onDelData(colData) {
        let result: ResultModel = new ResultModel();

        this.delService.deleteData(colData).subscribe(
            data => {
                result = data;
                if(result.result){
                    // alert(삭제되었습니다.);
                }
            }
        )
    }
}
