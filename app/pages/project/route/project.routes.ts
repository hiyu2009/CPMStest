import {RouterConfig}          from '@angular/router';
import {ProjectList}           from '../projectList/projectList.component';
import {ProjectDetail}         from '../projectDetail/projectDetail.component';
import {ProjectAdd}            from '../projectAdd/projectAdd.component';
import {ProjectUpdate}         from '../projectUpdate/projectUpdate.component';
import {ModifyOutsourcing}     from '../oursourcing/modifyOutsourcing.component';

export const ProjectRoutes:RouterConfig = [
    {path: 'project/selectList', component: ProjectList},
    {path: 'project/selectDetail/:id', component: ProjectDetail},
    {path: 'project/insertProject', component: ProjectAdd},
    {path: 'project/updateProject/:id', component: ProjectUpdate},
    {path: 'project/modifyOutsourcing', component: ModifyOutsourcing}
];


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
