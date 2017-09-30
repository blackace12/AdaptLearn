import { FormControl } from '@angular/forms';

export class NameValidator {

  static isValid(control: FormControl){
    const re = /^[A-Z]'?[- a-zA-Z]+$/.test(control.value);

    if (re){
      return null;
    }

    return {
      "invalidEmail": true
    };

  }
}