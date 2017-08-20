import { Pipe, PipeTransform } from '@angular/core';
import {find} from 'lodash';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    console.log(args);
    console.log(find(value, args[0]));
    return find(value, args[0]);
  }

}
