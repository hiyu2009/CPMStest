import { RouterConfig }          from '@angular/router';
import { ProjectList }           from '../projectList/projectList.component';
import { ProjectDetail }         from '../projectDetail/projectDetail.component';
import { ProjectInsert }         from '../projectInsert/projectInsert.component';

export const ProjectRoutes: RouterConfig = [
  { path: 'project/selectList',  component: ProjectList },
  { path: 'project/selectDetail/:id', component: ProjectDetail },
  { path: 'project/insertProject', component: ProjectInsert }
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
