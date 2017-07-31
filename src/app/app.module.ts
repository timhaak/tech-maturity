import {CommonModule} from '@angular/common';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ChartsModule} from 'ng2-charts';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {BlankComponent} from './components/main/blank/blank.component';
import {BodyComponent} from './components/main/body/body.component';
import {HeadComponent} from './components/main/head/head.component';
import {HomeComponent} from './components/main/home/home.component';

import {metaReducers, reducers} from './reducers';
import {AppRoutingModule} from './routes/app-routing.module';
import { AssetAddComponent } from './components/asset/asset-add/asset-add.component';
import {FormsModule} from '@angular/forms';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';
import {MomentModule} from 'angular2-moment';
import {AssetEffects} from './effects/asset.effects';
import { AssetsComponent } from './components/asset/assets/assets.component';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    BodyComponent,
    HeadComponent,
    HomeComponent,
    AssetAddComponent,
    AssetsComponent,
  ],
  imports: [
    AppRoutingModule,
    AsyncLocalStorageModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    EffectsModule.forRoot([
      AssetEffects,
    ]),
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    MomentModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 2}) : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}
