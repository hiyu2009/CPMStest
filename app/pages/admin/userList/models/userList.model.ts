import { Injectable } from '@angular/core';

@Injectable()
export class UserListModel {
  public userId: string;
  public password: string;
  public userName: string;
  public deptCode: string;
  public deptName: string;
  public rankCode: string;
  public rankName: string;
  public roleCode: string;
  public description: string;

}
