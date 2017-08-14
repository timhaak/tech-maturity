import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeUntil';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {InterfaceCategory} from '../../../interfaces/InterfaceCategory';
import {InterfaceCategoryCapability} from '../../../interfaces/InterfaceCategoryCapability';
import {InterfaceCategoryCapabilityLevel} from '../../../interfaces/InterfaceCategoryCapabilityLevel';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
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
  public categoryState$: Observable<InterfaceStateCategory>;
  public category_id = '';
  public category_capability_index = 0;
  public categories: InterfaceCategory[] = [];
  public category_capabilities: InterfaceCategoryCapability[] = [];
  public category_capability_levels: { [category_capability_id: string]: InterfaceCategoryCapabilityLevel[] } = {};
  public progress = 0;

  constructor(private route: ActivatedRoute,
              private store: Store<InterfaceStateApp>) {

    this.categoryState$ = this.store
      .select(fromRoot.selectCatergoryState)
      .takeUntil(this.stop$);

    this.route.params
      .takeUntil(this.stop$)
      .subscribe((params: Params) => {
        this.asset_id = params['asset_id'];
        this.setCategory(this.category_id);
      });
  }

  setCategory(categoryId: string) {
    this.category_id = categoryId;

    const category_capability_levels: { [category_capability_id: string]: InterfaceCategoryCapabilityLevel[] } = {};

    this.categoryState$
      .subscribe((stateCategory: InterfaceStateCategory) => {
        this.categories = stateCategory.categories;
        if (this.category_id === '' && this.categories.length > 0) {
          this.category_id = this.categories[0].id;
        }
        this.category_capabilities = stateCategory
          .category_capabilities
          .filter((category_capability: InterfaceCategoryCapability) => {
            return category_capability.category_id === this.category_id;
          });

        this.category_capability_index = 0;
        this.setProgress();

        this.category_capabilities
          .forEach((category_capability: InterfaceCategoryCapability) => {
            category_capability_levels[category_capability.id] = stateCategory
              .category_capability_levels
              .filter((category_capability_level: InterfaceCategoryCapabilityLevel) => {
                return category_capability_level.category_capability_id === category_capability.id;
              });
          });
      });
    this.category_capability_levels = category_capability_levels;
  }

  nextQuestion() {
    this.category_capability_index++;
    this.setProgress();
  }

  previousQuestion() {
    this.category_capability_index--;
    this.setProgress();
  }

  setProgress() {
    this.progress = (this.category_capability_index + 1) / (this.category_capabilities.length + 1) * 100;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stop$.next(true);
  }
}
