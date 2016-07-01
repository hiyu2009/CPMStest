import { provideRouter, RouterConfig } from '@angular/router';
import { Login } from './pages/login/login.component';
import { Home } from './pages/home/home.component';
import { PartnerAdd } from './pages/partner/partnerAdd/partnerAdd.component';
import { ProjectList } from './pages/project/projectList/projectList.component';

export const routes: RouterConfig = [
  { path: 'login', component: Login },
  { path: '', component: Home },
  { path: 'partner/insert', component: PartnerAdd },
  { path: 'project/selectList', component: ProjectList }
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
