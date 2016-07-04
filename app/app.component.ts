import { Component, OnDestroy } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavBar } from './pages/navBar/navBar.component';
import { SideBar } from './pages/sideBar/sideBar.component';

import { LoginService } from './pages/login/services/login.service';
import { ProjectListService } from './pages/project/projectList/services/projectList.service';

@Component({
  selector: 'my-app',
  directives: [NavBar, SideBar, ROUTER_DIRECTIVES],
  providers:[ HTTP_PROVIDERS, LoginService, ProjectListService ],
  template:`
    <nav-bar></nav-bar>
    <side-bar></side-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor (private loginService: LoginService) {}

  ngOnDestroy(){
    this.loginService.logout();
  }
}

// <router-outlet></router-outlet>
