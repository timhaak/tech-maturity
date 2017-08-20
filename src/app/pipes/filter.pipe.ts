import { Pipe, PipeTransform } from '@angular/core';
import {filter} from 'lodash';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return filter(value, args);
  }

}
