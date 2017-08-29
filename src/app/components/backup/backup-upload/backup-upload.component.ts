import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {InterfaceStateApp} from '../../../interfaces/InterfaceStateApp';
import * as assetAction from '../../../actions/asset.action';

@Component({
  selector: 'app-backup-upload',
  templateUrl: './backup-upload.component.html',
  styleUrls: ['./backup-upload.component.scss'],
})
export class BackupUploadComponent implements OnInit {

  enableButton = false;

  validImageMimeTypes = [
    'application/json',
  ];

  file: File;

  constructor(private store: Store<InterfaceStateApp>) {
  }

  ngOnInit() {
  }

  onFileChange($event) {
    if ($event.currentFiles.length > 0) {
      this.file = $event.currentFiles[0];
      this.enableButton = true;
    } else {
      this.file = null;
      this.enableButton = false;
    }
  }

  submitFile() {
    this.store.dispatch(new assetAction.BackupUpload(this.file));
  }

}
