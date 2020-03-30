import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toYears'
})
export class ToYearsPipe implements PipeTransform {
  transform(value: string): number {
    const ageDifMs = Date.now() - +new Date(value);
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
