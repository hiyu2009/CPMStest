import {Component, OnInit}             from '@angular/core';
import 'rxjs/Rx';
import {SelectProgressListService}             from './services/selectProgressList.service';

import {HTTP_PROVIDERS, Http} from "@angular/http";
import {DatePipe} from "@angular/common";

import {DatePicker}        from '../../../common/components/datepicker/ng2-datepicker';
import {DataTableDirectives} from 'angular2-datatable/datatable';

@Component({
    selector: 'progress-list',
    // directives: [ProjectListTable],
    directives: [DatePicker, DataTableDirectives],
    providers: [SelectProgressListService, HTTP_PROVIDERS],
    templateUrl: 'selectProgressList.html',
    styleUrls: ['../css/progress.css'],
    pipes: [DatePipe]
})

export class SelectProgressList implements OnInit {
    private data;

    constructor(private http:Http) {
        http.get("app/data.json")
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 1000);
            });
    }

    private sortByWordLength = (a:any) => {
        return a.name.length;
    }

    private startDate: any = null;
    private endDate:any = null;

    ngOnInit() {
        console.log("INNER ngOnInit");

    }
}