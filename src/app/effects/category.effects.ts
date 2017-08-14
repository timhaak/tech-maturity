import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import * as CategoryAction from '../actions/category.action';
import {InterfaceStateApp} from '../interfaces/InterfaceStateApp';

@Injectable()
export class AssetEffects {

  @Effect({ dispatch: false })
  addAllData$ = this.actions$
    .ofType(CategoryAction.ALL_DATA_ADD)
    .do(() => this.router.navigate(['/asset']));

  constructor(private actions$: Actions,
              private router: Router,
              private store: Store<InterfaceStateApp>) {
  }
}
