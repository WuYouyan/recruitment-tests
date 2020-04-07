import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simplified'
})
export class SimplifiedPipe implements PipeTransform {

  transform(value: string[] = [''], sliceEnd: number): string {
      return value.join('.').slice(0, sliceEnd);
  }

}
