import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string,
    confirmPasswordControlName: string) => {
      const validator = (form: AbstractControl) => {
        const passwordControl =  form.get(passwordControlName); // form.get you can find the control inside the form
        const confirmPasswordControl =  form.get(confirmPasswordControlName);

        //we Have Pass and confirmPass so now can compare its values
        if(!passwordControl || !confirmPasswordControl) return;  //check is pass and confirmpass undefined

        if(passwordControl.value !== confirmPasswordControl.value){
          confirmPasswordControl.setErrors({notMatch: true});
        }else{
          const errors = confirmPasswordControl.errors;
          if(!errors) return;  //if there is no error

          delete errors.notMatch; // delete property from object
          confirmPasswordControl.setErrors(errors); // after removing the not match
          //we want to set error
        }
      }
      return validator;
    }
