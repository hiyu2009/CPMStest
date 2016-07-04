import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'table-list',
  templateUrl: 'app/common/components/table/table-list/table-list.html'
})
export class TableListComponent {
  @Input('table-headers') tableHeaders: string[];
  @Input('table-rowModels') tableRowModels: any[];
  @Input('detail-routePage') detailRoutePage: string; //테이블 리스트 클릭시 이동되는 페이지 링크
  @Input('mainPageName') mainPageName: string;

  constructor (
                private router: Router
              ) {
    for(let model of this.tableRowModels){
      console.log(model.col1);
    }
  }

  onRowClick(colData: any) {
    let link = [this.detailRoutePage, colData];
    this.router.navigate(link);
  }
}
