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
import {PartnerUpdateService} from '../../partnerUpdate/services/partnerUpdate.service'
import {ResultModel}          from '../../../../common/models/result.model';
import {of} from "rxjs/observable/of";

@Component({
    selector: 'partner-list-table',
    directives: [ROUTER_DIRECTIVES],
    providers: [PartnerUpdateService],
    templateUrl: 'app/pages/partner/partnerList/components/partnerListTable.html',
    styleUrls: ['./app/pages/partner/partnerList/partnerlist.css']
})



export class PartnerListTable implements OnInit {
    @Input('table-headers') tableHeaders:Object;
    @Input('table-rowModels') tableRowModels:Observable<any>;
    @Output() searchEvent:EventEmitter<any> = new EventEmitter();

    private searchBox:Control = new Control();
    private userPartnerCode:string;
    private userBusinessCode:string;

    constructor(private router:Router,
                private  delService:PartnerUpdateService) {
        this.userPartnerCode = localStorage.getItem('partnerCode');
        this.userBusinessCode = localStorage.getItem('businessCode');

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
        console.log("choice PartnerId : " + colData.partnerId);
        let link = ['/partner/selectDetail', colData.partnerId];
        this.router.navigate(link);
    }

    onInsertClick() {
        console.log("partnerTable.component.ts : insertBtn click!");
        let link = ['/partner/insertPartner'];
        this.router.navigate(link);
    }

    // onDelData(colData) {
    //     let result: ResultModel = new ResultModel();
    //
    //     this.delService.deleteData(colData).subscribe(
    //         data => {
    //             result = data;
    //             if(result.result){
    //                 // alert(삭제되었습니다.);
    //             }
    //         }
    //     )
    // }


}
