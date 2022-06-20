import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class CustomValidator{
  static dDateEnd:Date ;
  static dDateStart:Date ;

  static dateStart(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors  | null => {      
      CustomValidator.dDateStart = control.value
      return  null;
    };
  }
  static dateEnd(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors  | null => {
      
      CustomValidator.dDateEnd = control.value
      const bError = CustomValidator.dDateEnd && CustomValidator.dDateStart && CustomValidator.dDateEnd < CustomValidator.dDateStart;
      return bError ? {errorDate: {value: control.value}} : null;
    };
  }

  
}
// export function 