import {Injectable} from '@angular/core';
import {filter, find, forEach, maxBy, union, uniq} from 'lodash';
import {InterfaceAsset} from '../interfaces/InterfaceAsset';
import {InterfaceAssetGroup} from '../interfaces/InterfaceAssetGroup';
import {InterfaceAssetTest} from '../interfaces/InterfaceAssetTest';
import {InterfaceCategory} from '../interfaces/InterfaceCategory';
import {InterfaceCategoryCapability} from '../interfaces/InterfaceCategoryCapability';
import {InterfaceStateAsset} from '../interfaces/InterfaceStateAsset';
import {InterfaceStateCategory} from '../interfaces/InterfaceStateCategory';

@Injectable()
export class TestDataService {

  constructor() {
  }

  getAssetGroupAssets(assetGroup: InterfaceAssetGroup,
                      assetState: InterfaceStateAsset,
                      seenGroups = []) {
    let assets: InterfaceAsset[] = [];
    if (assetGroup && assetGroup.assets) {
      assets = assetGroup.assets
        .map((asset_id: string): InterfaceAsset => find(assetState.assets, {id: asset_id}));

      assetGroup.sub_groups
        .map((sub_group_id: any) => {
          if (seenGroups.indexOf(sub_group_id) === -1) {
            seenGroups.push(sub_group_id);
            const assetSubGroup = find(assetState.asset_groups, {id: sub_group_id});
            const subGroupAssets = this.getAssetGroupAssets(assetSubGroup, assetState, seenGroups);
            assets = union(assets, subGroupAssets);
          }
        });
    }

    return uniq(assets);
  }

  getTestData(assetTest: InterfaceAssetTest, assetState: InterfaceStateAsset, categoryState: InterfaceStateCategory) {
    const asset = find(assetState.assets, {id: assetTest.asset_id});

    const assetTestResult = {
      asset_name: asset.name,
      answered_count: assetTest.answered_count,
      completed_at: assetTest.completed_at,
      created_at: assetTest.created_at,
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

    forEach(categoryState.categories, (category: InterfaceCategory) => {
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

      categoryState
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

          const currentLevelId = assetTest.capabilities[capability.id];
          if (currentLevelId) {
            const currentLevel = find(categoryState.category_capability_levels, {id: currentLevelId});

            const nextLevel = find(categoryState.category_capability_levels, {
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

      assetTestResult.total_score += categoryResult.total_score;
      assetTestResult.total_score_normalised += categoryResult.total_score_normalised;
      assetTestResult.total_expected_score_normalised += categoryResult.total_expected_score_normalised;
      assetTestResult.total_above += categoryResult.total_above;
      assetTestResult.total_bellow += categoryResult.total_bellow;
      assetTestResult.total_skipped += categoryResult.total_skipped;
      assetTestResult.total_questions += categoryResult.total_questions;
      assetTestResult.total_equal += categoryResult.total_equal;
      assetTestResult.categories.push(categoryResult);
    });

    return assetTestResult;
  }

  groupAssetData(assets: InterfaceAsset[], assetState: InterfaceStateAsset,
                    categoryState: InterfaceStateCategory) {

    let countTests = 0;
    const assetTestsLast = [];

    const result = {
      answered_count: 0,
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
    assets.forEach((asset) => {
      const assetTests: InterfaceAssetTest[] = filter(assetState.asset_tests,
        (assetTest: InterfaceAssetTest) => {
          return asset.id === assetTest.asset_id &&
            assetTest.completed_at !== null;
        });

      const assetTestsMax = maxBy(
        assetTests,
        (asset_test: InterfaceAssetTest) => asset_test.created_at,
      );

      if (assetTestsMax) {
        assetTestsLast.push(assetTestsMax);
      }

    });

    countTests = assetTestsLast.length;

    assetTestsLast.forEach((assetTest) => {
      const testResult = this.getTestData(assetTest, assetState, categoryState);

      result.answered_count += testResult.answered_count / countTests;
      result.total_score += testResult.total_score / countTests;
      result.total_score_normalised += testResult.total_score_normalised / countTests;
      result.total_expected_score_normalised += testResult.total_expected_score_normalised / countTests;
      result.total_equal += testResult.total_equal / countTests;
      result.total_above += testResult.total_above / countTests;
      result.total_bellow += testResult.total_bellow / countTests;
      result.total_skipped += testResult.total_skipped / countTests;
      result.total_questions += testResult.total_questions / countTests;

      testResult.categories
        .forEach((categoryResult, key) => {
          if (!result.categories[key]) {
            result.categories[key] = {
              category_name: categoryResult.category_name,
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
          }

          result.categories[key].total_score += +categoryResult.total_score / countTests;
          result.categories[key].total_score_normalised += categoryResult.total_score_normalised / countTests;
          result.categories[key].total_expected_score_normalised +=
            categoryResult.total_expected_score_normalised / countTests;
          result.categories[key].total_equal += categoryResult.total_equal / countTests;
          result.categories[key].total_above += categoryResult.total_above / countTests;
          result.categories[key].total_bellow += categoryResult.total_bellow / countTests;
          result.categories[key].total_skipped += categoryResult.total_skipped / countTests;
          result.categories[key].total_questions += categoryResult.total_questions / countTests;

          categoryResult.capabilities
            .forEach((capability, capabilityKey) => {
              if (!result.categories[key].capabilities[capabilityKey]) {
                result.categories[key].capabilities[capabilityKey] = {
                  capability_name: capability.capability_name,
                  score: 0,
                  current_level: 0,
                  minimum_category_capability_level_id: capability.minimum_category_capability_level_id,
                  current_level_value: capability.current_level_value,
                  next_level_value: 0,
                };
              }

              result.categories[key].capabilities[capabilityKey].score += capability.score / countTests;
              result.categories[key].capabilities[capabilityKey].current_level += capability.current_level / countTests;
              result.categories[key].capabilities[capabilityKey].next_level_value +=
                capability.next_level_value / countTests;
            });
        });
    });

    return result;
  }
}
