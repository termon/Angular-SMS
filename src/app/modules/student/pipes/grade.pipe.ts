import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grader'
})
export class GradePipe implements PipeTransform {

  transform(value: number): string {
    if (value < 40) { return 'No Award'; }
    else if (value < 50) { return '3rd'; }
    else if (value < 60) { return '2.2'; }
    else if (value < 70) { return '2.1'; }
    else { return '1st'; }
  }

}

@Pipe({
  name: 'grade-colour'
})
export class GradeColourPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 40) { return 'danger'; }
    else if (value < 50) { return 'warning'; }
    else if (value < 60) { return 'success'; }
    else if (value < 70) { return 'success'; }
    else { return 'primary'; }
  }

}
