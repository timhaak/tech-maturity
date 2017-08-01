import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-home-stats',
  templateUrl: './home-stats.component.html',
  styleUrls: ['./home-stats.component.scss'],
})
export class HomeStatsComponent implements OnInit {

  assetState$: Observable<InterfaceStateAsset>;

  constructor(private store: Store<InterfaceStateApp>,
              private router: Router) {
    this.assetState$ = this.store.select(fromRoot.selectAssetState);
  }

  ngOnInit() {
  }

  gotoAsset() {
    this.router.navigate(['/asset']);
  }

}
