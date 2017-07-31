import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent} from '../components/main/blank/blank.component';
import {AuthGuard} from '../guards/auth.guard';
import {AssetAddComponent} from '../components/asset/asset-add/asset-add.component';
import {AssetsComponent} from '../components/asset/assets/assets.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    component: BlankComponent,
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
