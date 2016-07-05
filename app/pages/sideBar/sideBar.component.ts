import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { ACCORDION_DIRECTIVES } from 'ng2-accordion';

import { SelectMenuModel } from '../../common/models/selectMenu.model';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'side-bar',
  templateUrl: './app/pages/sideBar/sideBar.html',
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  styleUrls: ['app/pages/sideBar/sidebar.css']
})
export class SideBar {
  private selMenuModel: SelectMenuModel[] = [];

  private partnerMenuList: SelectMenuModel[] = [];
  private projectMenuList: SelectMenuModel[] = [];
  private progressMenuList: SelectMenuModel[] = [];
  private adminMenuList: SelectMenuModel[] = [];

  constructor(private loginService: LoginService) {
    if(localStorage.getItem("currentUserData") != null){
      this.selMenuModel = JSON.parse(localStorage.getItem("currentUserData")).selectMenuModels;

      for(let menuModel of this.selMenuModel){
        if(menuModel.showYN == "Y"){
          switch(menuModel.mainMenuId){
            case 2:
              this.partnerMenuList.push(menuModel);
              break;
            case 3:
              this.projectMenuList.push(menuModel);
              break;
            case 4:
              this.progressMenuList.push(menuModel);
              break;
            case 5:
              this.adminMenuList.push(menuModel);
              break;
          }
        }
      }
    }

    console.log(this.partnerMenuList);
    console.log(this.projectMenuList);
    console.log(this.progressMenuList);
    console.log(this.adminMenuList);
  }
}
