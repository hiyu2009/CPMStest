import {RouterConfig}          from '@angular/router';
import {PartnerList}           from '../partnerList/partnerList.component';
import {PartnerDetail}         from '../partnerDetail/partnerDetail.component';
import {PartnerAdd}            from '../partnerAdd/partnerAdd.component';
import {PartnerUpdate}         from '../partnerUpdate/partnerUpdate.component';

export const PartnerRoutes:RouterConfig = [
    { path: 'partner/selectList', component: PartnerList},
    { path: 'partner/selectDetail/:id', component: PartnerDetail},
    { path: 'partner/insert', component: PartnerAdd },
    { path: 'partner/update', component: PartnerUpdate }
];
