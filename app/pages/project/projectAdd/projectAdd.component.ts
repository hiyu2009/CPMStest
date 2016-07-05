import {Component, OnInit} from '@angular/core';
import {ProjectModel}      from  '../../../common/models/project.model';
import {PartnerCodeModel}  from '../../../common/models/partnerCode.model';
import {ProjectAddService} from './services/projectAdd.services';
import {LoginService}      from '../../login/services/login.service';
import {DatePicker}        from '../../../common/components/datepicker/ng2-datepicker';

@Component({
    selector:    'project-insert',
    templateUrl: 'app/pages/project/projectAdd/projectAdd.html',
    directives:  [ DatePicker],
    providers:   [ ProjectAddService ],
    styleUrls:   ['./app/pages/project/css/project.css']
})
export class ProjectAdd implements OnInit {
    private addPjtModel:ProjectModel;
    private partnerListModel:PartnerCodeModel[];
    private startDate: any = null;
    private endDate:any = null;

    constructor(private pjtAddService:ProjectAddService,
                private loginService:LoginService) {
        this.addPjtModel = new ProjectModel();
        this.partnerListModel = [];
    }

    ngOnInit() {
        if (this.loginService.checkLogin()) {
            //매출처 데이터를 가져옴
            this.pjtAddService.getDeptCode().subscribe(
                data => {
                    this.partnerListModel = data;
                    console.log("get partnerList Success!!");
                    console.log(this.partnerListModel);
                }, error => console.log("ProjectAdd - ngOnInit getPartnerList Error : " + error)
            )
        }
    }
}
