import {Component, Input, OnInit} from '@angular/core';
import {ConstantAppConfig} from '../../../constants/ConstantAppConfig';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {

  constantAppConfig = ConstantAppConfig;

  constructor() {
  }

  ngOnInit() {
  }

  logOut() {
  }

}
