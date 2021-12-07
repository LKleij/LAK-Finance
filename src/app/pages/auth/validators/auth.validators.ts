import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class CustomValidators {

    static validateEmails(disabled: boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!disabled)
                return null

            let email = control.get('email').value as string;
            let emailConfirm = control.get('emailConfirm').value as string;

            if (email.toLowerCase() != emailConfirm.toLowerCase())
                return { emailsNotEqual: true }

            return null

        }
    }

    static validatePasswords(disabled: boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!disabled)
                return null

            let password = control.get('password').value as string;
            let passwordConfirm = control.get('passwordConfirm').value as string;

            if (password != passwordConfirm)
                return { passwordsNotEqual: true }

            return null

        }
    }
}