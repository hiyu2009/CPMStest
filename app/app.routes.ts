import { provideRouter, RouterConfig } from '@angular/router';
import { CanDeactivateGuard } from './interfaces';

import { Login } from './pages/login/login.component';
import { Home } from './pages/home/home.component';
import { PartnerRoutes } from './pages/partner/route/partner.routes'
import { ProjectRoutes } from './pages/project/route/project.routes'
import { UserAdd } from './pages/admin/userAdd/userAdd.component';
import { UserUpdate } from './pages/admin/userUpdate/userUpdate.component';
import {userList} from './pages/admin/userList/userList.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/home', terminal: true },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'admin/insertUser', component: UserAdd },
  { path: 'admin/updateUser', component: UserUpdate },
  { path: 'admin/selectUserList', component: userList },
  ...PartnerRoutes,
  ...ProjectRoutes
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  CanDeactivateGuard
];
