import { provideRouter, RouterConfig } from '@angular/router';
import { CanDeactivateGuard } from './interfaces';

import { Login } from './pages/login/login.component';
import { Home } from './pages/home/home.component';
import { PartnerAdd } from './pages/partner/partnerAdd/partnerAdd.component';
import { PartnerUpdate } from './pages/partner/partnerUpdate/partnerUpdate.component';
import { ProjectRoutes } from './pages/project/route/project.routes'
import { UserAdd } from './pages/admin/userAdd/userAdd.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/home', terminal: true },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'partner/insert', component: PartnerAdd },
  { path: 'partner/update', component: PartnerUpdate },
  // 160705
  { path: 'admin/insertUser', component: UserAdd },
  ...ProjectRoutes
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  CanDeactivateGuard
];
