import { RouterConfig }          from '@angular/router';
import {ProgressManpwer} from "../manpower/progressManpower.component";
import {ModifyManpowerMM} from "../modifyManpowerMM/modifyManpowerMM.component";
// import { SelectProgressList }           from '../selectProgressList/selectProgressList.component';

export const ProgressRoutes: RouterConfig = [
  // { path: 'progress/selectProgressList',  component: SelectProgressList }
    { path: 'progress/selectManpowerList',  component: ProgressManpwer},
    { path: 'progress/modifyManpowerMm', component: ModifyManpowerMM}
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
