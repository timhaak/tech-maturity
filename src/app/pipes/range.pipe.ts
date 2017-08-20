import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'range',
})
export class RangePipe implements PipeTransform {

  transform(value: any): any {
    const loopArray = [];
    for (let i = 1; i <= value; i++) {
      loopArray.push(i);
    }
    return loopArray;
  }

}
