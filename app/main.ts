import { bootstrap }            from '@angular/platform-browser-dynamic';
import { AppComponent }         from './app.component';

import { provide }              from '@angular/core';
import { APP_BASE_HREF }          from '@angular/common';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'})
]);
