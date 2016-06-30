import { provideRouter, RouterConfig } from '@angular/router';
import { Login } from './pages/login/login.component';
import { Home } from './pages/home/home.component';

export const routes: RouterConfig = [
  { path: 'login', component: Login },
  { path: '', component: Home }
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
