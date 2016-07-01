import { provideRouter, RouterConfig } from '@angular/router';
import { Login } from './pages/login/login.component';
import { Home } from './pages/home/home.component';
import { PartnerAdd } from './pages/partner/partnerAdd/partnerAdd.component';
import { ProjectList } from './pages/project/projectList/projectList.component';
import { ProjectDetail } from './pages/project/projectDetail/projectDetail.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/home', terminal: true },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'partner/insert', component: PartnerAdd },
  { path: 'project/selectList', component: ProjectList },
  { path: 'project/selectDetail/:id', component: ProjectDetail }
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
