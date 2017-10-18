import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {find, findIndex} from 'lodash';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeUntil';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as assetAction from '../../../actions/asset.action';
import {InterfaceAsset} from '../../../interfaces/InterfaceAsset';
import {InterfaceAssetTest} from '../../../interfaces/InterfaceAssetTest';
import {InterfaceCategory} from '../../../interfaces/InterfaceCategory';
import {InterfaceCategoryCapability} from '../../../interfaces/InterfaceCategoryCapability';
import {InterfaceCategoryCapabilityLevel} from '../../../interfaces/InterfaceCategoryCapabilityLevel';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import {InterfaceStateCategory} from '../../../interfaces/InterfaceStateCategory';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit, OnDestroy {

  private stop$: Subject<boolean> = new Subject();
  public asset_id: string;
  public asset_test_id: string;
  public asset: InterfaceAsset;
  public asset_test: InterfaceAssetTest;
  public categoryState$: Observable<InterfaceStateCategory>;
  public categoryState: InterfaceStateCategory;
  public assetState$: Observable<InterfaceStateAsset>;
  public assetState: InterfaceStateAsset;
  public category_id = '';
  public category_index = 0;
  public category_capability_index = 0;
  public categories: InterfaceCategory[] = [];
  public category_capabilities: InterfaceCategoryCapability[] = [];
  public category_capability_levels: { [category_capability_id: string]: InterfaceCategoryCapabilityLevel[] } = {};
  public progress = 0;

  constructor(private route: ActivatedRoute,
              private store: Store<InterfaceStateApp>) {

    this.categoryState$ = this.store
      .select(fromRoot.selectCategoryState)
      .takeUntil(this.stop$);

    this.assetState$ = this.store
      .select(fromRoot.selectAssetState)
      .takeUntil(this.stop$);

    this.assetState$
      .subscribe((assetState: InterfaceStateAsset) => {
        this.assetState = assetState;
        this.getData();
      });

    this.route.params
      .takeUntil(this.stop$)
      .subscribe((params: Params) => {
        this.asset_test_id = params['asset_test_id'];
        this.getData();
      });
  }

  ngOnInit() {
  }

  getData() {
    if (!this.asset_test) {
      this.setCategory(this.category_id);
    }

    if (this.asset_test_id && this.assetState.asset_tests) {
      this.asset_test = find(this.assetState.asset_tests, {'id': this.asset_test_id});
    }
    if (this.asset_test && this.assetState.assets) {
      this.asset = find(this.assetState.assets, {'id': this.asset_test.asset_id});
    }
  }


  setCategory(categoryId: string) {
    this.category_id = categoryId;

    this.category_index = this.categories
      .findIndex((category) => {
        return category.id === categoryId;
      });

    const category_capability_levels: { [category_capability_id: string]: InterfaceCategoryCapabilityLevel[] } = {};

    this.categoryState$
      .subscribe((stateCategory: InterfaceStateCategory) => {
        this.categoryState = stateCategory;
        this.categories = stateCategory.categories;
        if (this.category_id === '' && this.categories.length > 0) {
          this.category_id = this.categories[0].id;
        }
        this.category_capabilities = stateCategory
          .category_capabilities
          .filter((category_capability: InterfaceCategoryCapability) => {
            return category_capability.category_id === this.category_id;
          });

        this.setProgress();

        this.category_capabilities
          .forEach((category_capability: InterfaceCategoryCapability) => {
            category_capability_levels[category_capability.id] = stateCategory
              .category_capability_levels
              .filter((category_capability_level: InterfaceCategoryCapabilityLevel) => {
                return category_capability_level.category_capability_id === category_capability.id;
              });
          });

        if (!this.category_capability_index) {
          this.category_capability_index = 0;
        } else if (this.category_capability_index > this.category_capabilities.length ||
          this.category_capability_index < 0) {
          this.category_capability_index = this.category_capabilities.length - 1;
        }
        this.setProgress();
      });
    this.category_capability_levels = category_capability_levels;
  }

  setCapabilityValue(category_capability_id: string, category_capability_level_id: string) {
    this.asset_test.capabilities[category_capability_id] = category_capability_level_id;
    this.store.dispatch(new assetAction.AssetTestUpdate(this.asset_test));
    this.nextQuestion();
  }

  nextQuestion() {
    this.category_capability_index++;
    if (this.category_capability_index > this.category_capabilities.length - 1) {
      this.category_capability_index = 0;
      if (this.categories[this.category_index + 1]) {
        this.setCategory(this.categories[this.category_index + 1].id);
      } else {
        this.setCategory(this.categories[0].id);
      }
    }
    this.setProgress();
  }

  previousQuestion() {
    this.category_capability_index--;
    if (this.category_capability_index < 0) {
      if (this.category_index > 0) {
        this.setCategory(this.categories[this.category_index - 1].id);
      }
    }
    this.setProgress();
  }

  setCategoryCapabilityId(category_capability_id: number) {
    this.category_capability_index = findIndex(this.category_capabilities, {'id': category_capability_id});
    this.setProgress();
  }

  setProgress() {
    this.progress = (this.category_capability_index + 1) / (this.category_capabilities.length) * 100;
  }

  testLevel(category_capability: InterfaceCategoryCapability) {
    if (this.category_capability_levels[category_capability.id]) {
      const minLevel = category_capability.minimum_category_capability_level_id;
      const level = find(
        this.category_capability_levels[category_capability.id],
        {
          id: this.asset_test.capabilities[category_capability.id],
        });
      if (minLevel > level.level) {
        return -1;
      } else if (minLevel === level.level) {
        return 0;
      }
      return 1;
    }
    return null;
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

  completeTest() {
    this.store.dispatch(new assetAction.AssetTestComplete(this.asset_test));
  }
}
