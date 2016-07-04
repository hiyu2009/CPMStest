import { Component, Input } from '@angular/core';
import { SelectListModel } from '../models/selectList.model';
import { Router } from '@angular/router';

@Component({
  selector: 'project-list-table',
  templateUrl: 'app/pages/project/projectList/components/projectListTable.html'
})
export class ProjectListTable {
  @Input('table-headers') tableHeaders: Array<string>;
  @Input('table-rowModels') tableRowModels: Array<SelectListModel>;

  constructor(private router: Router){    
  }

  onRowClick(colData) {
    let id = colData.projectId;
    let link = ['/project/selectDetail', id];
    this.router.navigate(link);
  }
}
