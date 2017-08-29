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
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AssetAddComponent} from './components/asset/asset-add/asset-add.component';
import {AssetsComponent} from './components/asset/assets/assets.component';
import {BlankComponent} from './components/main/blank/blank.component';
import {BodyComponent} from './components/main/body/body.component';
import {HeadComponent} from './components/main/head/head.component';
import {HomeStatsComponent} from './components/main/home-stats/home-stats.component';
import {HomeComponent} from './components/main/home/home.component';
import {AssetTestResultChartComponent} from './components/report/asset-test-result-chart/asset-test-result-chart.component';
import {AssetTestResultPolarComponent} from './components/report/asset-test-result-polar/asset-test-result-polar.component';
import {AssetTestResultTableComponent} from './components/report/asset-test-result-table/asset-test-result-table.component';
import {AssetTestResultComponent} from './components/report/asset-test-result/asset-test-result.component';
import {TestComponent} from './components/test/test/test.component';
import {AssetEffects} from './effects/asset.effects';
import {FilterPipe} from './pipes/filter.pipe';
import {FindPipe} from './pipes/find.pipe';
import {RangePipe} from './pipes/range.pipe';

import {metaReducers, reducers} from './reducers';
import {AppRoutingModule} from './routes/app-routing.module';
import {DataService} from './services/data.service';
import { BackupComponent } from './components/backup/backup/backup.component';
import { BackupDownloadComponent } from './components/backup/backup-download/backup-download.component';
import { BackupUploadComponent } from './components/backup/backup-upload/backup-upload.component';
import { Ng2FileInputModule } from 'ng2-file-input';

@NgModule({
  declarations: [
    AppComponent,
    AssetAddComponent,
    AssetsComponent,
    AssetTestResultComponent,
    AssetTestResultTableComponent,
    AssetTestResultPolarComponent,
    AssetTestResultChartComponent,
    BlankComponent,
    BodyComponent,
    FilterPipe,
    FindPipe,
    HeadComponent,
    HomeComponent,
    HomeStatsComponent,
    RangePipe,
    TestComponent,
    BackupComponent,
    BackupDownloadComponent,
    BackupUploadComponent,
  ],
  imports: [
    AppRoutingModule,
    AsyncLocalStorageModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      AssetEffects,
    ]),
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    MomentModule,
    Ng2FileInputModule.forRoot(),
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
