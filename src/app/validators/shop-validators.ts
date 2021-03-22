import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {

    //White Space Validation
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
        //Check if string only has white spaces
        if (control.value != null && control.value.trim().length === 0) {
            return { 'notOnlyWhiteSpace': true };
        }
        else {
            return null as any;
        }

    }


}
