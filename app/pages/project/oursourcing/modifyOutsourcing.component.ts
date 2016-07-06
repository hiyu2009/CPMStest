import {Component, OnInit}         from '@angular/core';
import {ProjectModel}              from '../../../common/models/project.model';
import {OutsourcingManagerService} from './services/outsourcingManager.service';

@Component({
    selector: 'outsourcing',
    templateUrl: 'app/pages/project/oursourcing/outsourcing.html'
})
export class  ModifyOutsourcing implements OnInit{
    private pjtListModel: ProjectModel[];

    constructor(private service: OutsourcingManagerService){
        this.pjtListModel = [];
    }

    ngOnInit() {
        this.service.getPjtList().subscribe(
            data=>{
                this.pjtListModel = data;
                console.log("pjtList : ");
                console.log(this.pjtListModel);
            }, error => console.log("outsourcing - getPjtList error: " + error);
        )
    }
}