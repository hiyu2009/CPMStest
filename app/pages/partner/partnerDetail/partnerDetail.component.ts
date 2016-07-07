/**
 * Created by seokyoon on 2016-07-06.
 */
import {Component, OnInit}      from '@angular/core';
import {Router, ActivatedRoute,
    ROUTER_DIRECTIVES}      from '@angular/router';
import {PartnerDetailService}   from './services/partnerDetail.service';
import {SelectDetailModel}      from './models/selectDetail.model';
import {PartnerModel}           from '../../../common/models/partner.model';

@Component({
    selector: 'partner-detail',
    providers: [PartnerDetailService],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/pages/partner/partnerDetail/partnerDetail.html',
    styleUrls: ['app/pages/partner/css/partner.css', 'app/pages/partner/partnerDetail/partnerDetail.css']
})

export class PartnerDetail implements OnInit{
    private sub:any = null;
    private prtIDModel:PartnerModel;
    private prtDetailModel:SelectDetailModel;
    private userPartnerCode: string;
    private userBusinessCode: string;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private service:PartnerDetailService){

        this.prtDetailModel = new SelectDetailModel();
        this.prtIDModel = new PartnerModel();
        this.userPartnerCode = localStorage.getItem('partnerCode');
        this.userBusinessCode = localStorage.getItem('businessCode');

    }
    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            this.prtIDModel.partnerId = +params['id']; // (+) converts string 'id' to a number
            this.service.partnerIdByData(this.prtIDModel).subscribe(
                data => {
                    this.prtDetailModel = data;
                    console.log("detail.get ");
                    console.log(this.prtDetailModel);
                }, error => console.log(error)
            );
        });
    }

    goToModify() {
        console.log("click modify button" + this.prtDetailModel.partnerModel.partnerId);
        let link = ['/partner/updatePartner', this.prtDetailModel.partnerModel.partnerId];
        this.router.navigate(link);
    }

}
