import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'nav-bar',
  templateUrl: 'app/pages/navBar/navBar.html',
  directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES,  ]

})
export class NavBar {
  constructor (private loginService: LoginService) {

  }

    onClick() {
      if (this.loginService.checkLogin()) {
        this.loginService.logout();
      }
    }
  }
