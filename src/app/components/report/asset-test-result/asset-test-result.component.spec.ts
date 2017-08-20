import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTestResultComponent } from './asset-test-result.component';

describe('AssetTestResultComponent', () => {
  let component: AssetTestResultComponent;
  let fixture: ComponentFixture<AssetTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
