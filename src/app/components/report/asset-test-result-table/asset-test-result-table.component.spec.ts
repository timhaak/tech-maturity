import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTestResultTableComponent } from './asset-test-result-table.component';

describe('AssetTestResultTableComponent', () => {
  let component: AssetTestResultTableComponent;
  let fixture: ComponentFixture<AssetTestResultTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTestResultTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTestResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
