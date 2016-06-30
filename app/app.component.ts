import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavBar } from './pages/navBar/navBar.component'
import { SideBar } from './pages/sideBar/sideBar.component'

import { LoginService } from './pages/login/services/login.service';

@Component({
  selector: 'my-app',
  directives: [NavBar, SideBar, ROUTER_DIRECTIVES],
  providers:[ LoginService, HTTP_PROVIDERS ],
  template:`
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor (private loginService: LoginService) {}
}

// <router-outlet></router-outlet>
