import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTestResultPolarComponent } from './asset-test-result-polar.component';

describe('AssetTestResultPolarComponent', () => {
  let component: AssetTestResultPolarComponent;
  let fixture: ComponentFixture<AssetTestResultPolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTestResultPolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTestResultPolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
