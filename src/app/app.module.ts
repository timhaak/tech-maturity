import {CommonModule} from '@angular/common';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {MomentModule} from 'angular2-moment';
import {ChartsModule} from 'ng2-charts';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AssetAddComponent} from './components/asset/asset-add/asset-add.component';
import {AssetsComponent} from './components/asset/assets/assets.component';
import {BlankComponent} from './components/main/blank/blank.component';
import {BodyComponent} from './components/main/body/body.component';
import {HeadComponent} from './components/main/head/head.component';
import {HomeStatsComponent} from './components/main/home-stats/home-stats.component';
import {HomeComponent} from './components/main/home/home.component';
import {TestComponent} from './components/test/test/test.component';
import {AssetEffects} from './effects/asset.effects';

import {metaReducers, reducers} from './reducers';
import {AppRoutingModule} from './routes/app-routing.module';
import {DataService} from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    AssetAddComponent,
    AssetsComponent,
    BlankComponent,
    BodyComponent,
    HeadComponent,
    HomeComponent,
    HomeStatsComponent,
    TestComponent,
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
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}
