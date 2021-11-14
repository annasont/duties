import { Directive } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidateCalendar]'
})
export class ValidateCalendarDirective implements Validator
{

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(`ValidateCalendarDirective`, control);  
    return {'custom': 'KHJHJ HKJH'};
  }

  constructor() { }

} 



