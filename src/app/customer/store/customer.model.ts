export interface Customer {
    key: string;
    firstName: string;
    lastName: string;
    age: number;
    birthday: Date;
}

// Condition for validation message
export function setValidationMessageCondition(formControl: any, whenDirty: boolean, whenTouched: boolean) {
    return formControl['invalid'] &&
        ((whenDirty === undefined && whenTouched === undefined) ? true :
            ((whenTouched === undefined) ? formControl['dirty'] :
                ((whenDirty === undefined) ? formControl['touched'] :
                    (formControl['dirty'] || formControl['touched']))));
}
