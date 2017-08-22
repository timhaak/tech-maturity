import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {find, forEach} from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {InterfaceAsset} from '../../../interfaces/InterfaceAsset';
import {InterfaceAssetTest} from '../../../interfaces/InterfaceAssetTest';
import {InterfaceAssetType} from '../../../interfaces/InterfaceAssetType';
import {InterfaceCategory} from '../../../interfaces/InterfaceCategory';
import {InterfaceCategoryCapability} from '../../../interfaces/InterfaceCategoryCapability';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import {InterfaceStateAsset} from '../../../interfaces/InterfaceStateAsset';
import {InterfaceStateCategory} from '../../../interfaces/InterfaceStateCategory';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-asset-test-result',
  templateUrl: './asset-test-result.component.html',
  styleUrls: ['./asset-test-result.component.scss'],
})
export class AssetTestResultComponent implements OnInit, OnDestroy {

  private stop$: Subject<boolean> = new Subject();
  public categoryState$: Observable<InterfaceStateCategory>;
  public categoryState: InterfaceStateCategory;
  public assetState$: Observable<InterfaceStateAsset>;
  public assetState: InterfaceStateAsset;

  public asset_test_id: string;
  public assetTest: InterfaceAssetTest;
  public asset: InterfaceAsset;
  public assetType: InterfaceAssetType;
  public assetTestResult: any;

  constructor(private store: Store<InterfaceStateApp>,
              private route: ActivatedRoute) {

    this.categoryState$ = this.store
      .select(fromRoot.selectCatergoryState)
      .takeUntil(this.stop$);

    this.assetState$ = this.store
      .select(fromRoot.selectAssetState)
      .takeUntil(this.stop$);

    this.route.params
      .takeUntil(this.stop$)
      .subscribe((params: Params) => {
        this.asset_test_id = params['asset_test_id'];
        this.getData();
      });

    this.assetState$
      .subscribe((assetState: InterfaceStateAsset) => {
        this.assetState = assetState;
        this.getData();
      });

    this.categoryState$
      .subscribe((categoryState: InterfaceStateCategory) => {
        this.categoryState = categoryState;
        this.getData();
      });
  }

  getData() {
    if (this.asset_test_id &&
      this.assetState &&
      this.assetState.asset_tests &&
      this.categoryState &&
      this.categoryState.categories &&
      this.categoryState.category_capability_levels
    ) {
      this.assetTest = find(this.assetState.asset_tests, {id: this.asset_test_id});

      if (this.assetTest) {
        this.asset = find(this.assetState.assets, {id: this.assetTest.asset_id});
        this.assetType = find(this.assetState.asset_types, {id: this.asset.asset_type_id});

        this.assetTestResult = {
          asset_name: this.asset.name,
          asset_type_name: this.assetType.name,
          answered_count: this.assetTest.answered_count,
          completed_at: this.assetTest.completed_at,
          created_at: this.assetTest.created_at,
          total_score: 0,
          total_score_normalised: 0,
          total_expected_score_normalised: 0,
          total_equal: 0,
          total_above: 0,
          total_bellow: 0,
          total_skipped: 0,
          total_questions: 0,
          categories: [],
        };

        forEach(this.categoryState.categories, (category: InterfaceCategory) => {
          const categoryResult = {
            category_name: category.name,
            total_score: 0,
            total_score_normalised: 0,
            total_expected_score_normalised: 0,
            total_equal: 0,
            total_above: 0,
            total_bellow: 0,
            total_skipped: 0,
            total_questions: 0,
            capabilities: [],
          };

          this.categoryState
            .category_capabilities
            .filter(capability => capability.category_id === category.id)
            .forEach((capability: InterfaceCategoryCapability) => {
              const capabilityResult = {
                capability_name: capability.name,
                score: 0,
                current_level: -1,
                minimum_category_capability_level_id: capability.minimum_category_capability_level_id,
                current_level_value: '',
                next_level_value: '',
              };

              const currentLevelId = this.assetTest.capabilities[capability.id];
              if (currentLevelId) {
                const currentLevel = find(this.categoryState.category_capability_levels, {id: currentLevelId});

                const nextLevel = find(this.categoryState.category_capability_levels, {
                  level: currentLevel.level + 1,
                  category_capability_id: currentLevel.category_capability_id,
                });

                capabilityResult.capability_name = capability.name;
                capabilityResult.score = currentLevel.level - capability.minimum_category_capability_level_id;
                capabilityResult.current_level = currentLevel.level;
                capabilityResult.current_level_value = currentLevel.value;
                capabilityResult.next_level_value = nextLevel ? nextLevel.value : '';

                categoryResult.total_score += capabilityResult.score;
                categoryResult.total_score_normalised += capabilityResult.current_level;
                categoryResult.total_expected_score_normalised += capabilityResult.minimum_category_capability_level_id;

                if (capabilityResult.score > 0) {
                  categoryResult.total_above++;
                } else if (capabilityResult.score < 0) {
                  categoryResult.total_bellow++;
                } else {
                  categoryResult.total_equal++;
                }

              } else {
                categoryResult.total_skipped++;
              }
              categoryResult.total_questions++;
              categoryResult.capabilities.push(capabilityResult);
            });

          this.assetTestResult.total_score += categoryResult.total_score;
          this.assetTestResult.total_score_normalised += categoryResult.total_score_normalised;
          this.assetTestResult.total_expected_score_normalised += categoryResult.total_expected_score_normalised;
          this.assetTestResult.total_above += categoryResult.total_above;
          this.assetTestResult.total_bellow += categoryResult.total_bellow;
          this.assetTestResult.total_skipped += categoryResult.total_skipped;
          this.assetTestResult.total_questions += categoryResult.total_questions;
          this.assetTestResult.total_equal += categoryResult.total_equal;
          this.assetTestResult.categories.push(categoryResult);
        });
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }

}
