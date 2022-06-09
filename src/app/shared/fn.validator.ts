import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class clValidator{
  static dDateEnd:Date ;
  static dDateStart:Date ;

  static dateStart(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors  | null => {      
      clValidator.dDateStart = control.value
      return  null;
    };
  }
  static dateEnd(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors  | null => {
      
      clValidator.dDateEnd = control.value
      const bError = clValidator.dDateEnd && clValidator.dDateStart && clValidator.dDateEnd < clValidator.dDateStart;
      return bError ? {errorDate: {value: control.value}} : null;
    };
  }

  
}
// export function 