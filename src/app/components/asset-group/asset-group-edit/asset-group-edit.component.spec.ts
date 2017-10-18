import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetGroupEditComponent } from './asset-group-edit.component';

describe('AssetGroupEditComponent', () => {
  let component: AssetGroupEditComponent;
  let fixture: ComponentFixture<AssetGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
