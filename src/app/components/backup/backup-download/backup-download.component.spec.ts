import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDownloadComponent } from './backup-download.component';

describe('BackupDownloadComponent', () => {
  let component: BackupDownloadComponent;
  let fixture: ComponentFixture<BackupDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
