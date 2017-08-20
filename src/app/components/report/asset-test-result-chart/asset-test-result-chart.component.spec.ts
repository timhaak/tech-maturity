import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTestResultChartComponent } from './asset-test-result-chart.component';

describe('AssetTestResultChartComponent', () => {
  let component: AssetTestResultChartComponent;
  let fixture: ComponentFixture<AssetTestResultChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTestResultChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTestResultChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
