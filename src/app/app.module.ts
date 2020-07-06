import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './views/app.component';
import { NavMenuComponent } from './views/nav-menu/nav-menu.component';

import { StoreModule } from '@ngrx/store';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal })
  ],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
