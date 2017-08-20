import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssetAddComponent} from '../components/asset/asset-add/asset-add.component';
import {AssetsComponent} from '../components/asset/assets/assets.component';
import {HomeStatsComponent} from '../components/main/home-stats/home-stats.component';
import {AuthGuard} from '../guards/auth.guard';
import {TestComponent} from '../components/test/test/test.component';
import {AssetTestResultComponent} from '../components/report/asset-test-result/asset-test-result.component';
import {AssetTestResultTableComponent} from '../components/report/asset-test-result-table/asset-test-result-table.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeStatsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'asset',
    component: AssetsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'asset/add',
    component: AssetAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test/:asset_test_id',
    component: TestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test_result/:asset_test_id',
    component: AssetTestResultComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test_result_table/:asset_test_id',
    component: AssetTestResultTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthGuard,
  ],
})
export class AppRoutingModule {
}
