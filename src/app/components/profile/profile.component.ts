import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AbstructForm } from '../../utils/abstructForm';
import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { trigger, state, style, animate, transition} from '@angular/animations';
import * as _ from 'underscore';

interface Imaxlength {
    maxLength: number;
    currentLength: number;
    different: number;
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [
        trigger('viewTextUpdateForm', [
            state('inactive', style({
                opacity: 0,
                visibility: 'hidden'
            })),
            state('active',   style({
                opacity: 1,
                visibility: 'visible'
            })),
            transition('inactive => active', animate('300ms ease-in')),
            transition('active => inactive', animate('300ms ease-out'))
        ])
    ]
})
export class ProfileComponent extends AbstructForm implements OnInit {
    private currentUser: User;
    private formProfile: FormGroup;
    private addressBook: FormArray = new FormArray([]);
    private contactInfo: FormArray = new FormArray([]);
    private maskPhone: Array<string | RegExp>;
    public stateAnimate = 'inactive';
    constructor(
        private httpUser: UserService
    ) {
        super();
    }
    get maxAddressBook(): Imaxlength {
        const addressBook: any = this.formProfile.get('addressBook');
        return {
            maxLength: 5,
            currentLength: addressBook.controls.length,
            get different() {
               return this.maxLength - this.currentLength;
            }
        };
    }
    get maxContactInfo(): Imaxlength {
        const contactInfo: any = this.formProfile.get('contactInfo');
        return {
            maxLength: 5,
            currentLength: contactInfo.controls.length,
            get different() {
                return this.maxLength - this.currentLength;
            }
        };
    }
    ngOnInit() {
        this.currentUser = this.httpUser.getUserLocal();
        this.maskPhone = ['+', '3', '8', '(', '0', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
        this.formProfile = new FormGroup({
            email: this.getFormControl({value: this.currentUser.email, disabled: true}, {required: true, email: true}),
            name: this.getFormControl({value: this.currentUser.name, disabled: true}, {required: true, minLength: 2, maxLength: 50}),
            addressBook: new FormArray(this.transformUserFieldsToFormGroup('addressBook', this.currentUser.addressBook)),
            contactInfo: new FormArray(this.transformUserFieldsToFormGroup('contactInfo', this.currentUser.contactInfo))
        });
    }
    public updateStatusItem({ controls }) {
        controls.forEach((control: any) => {
           if (this.isFormControl(control)) {
               control.reset({value: control.value, disabled: !control.disabled});
           }
        });
    }
    public addItem(controlName: string) {
        this[controlName] = this.formProfile.get(controlName) as FormArray;
        this[controlName].push(this.createItem(controlName));
    }
    public saveItem(item: FormGroup) {
        _.mapObject(item.controls, (val, key) => {
            if (key === 'isNew') {
                val.setValue(!val.value);
            }
            val.reset({ value: val.value, disabled: true });
            return val;
        });
    }
    public deleteItem(controlName: string, item: FormGroup) {
        const arr: any = this.formProfile.controls[controlName];
        let index: number;
        _.each(arr.controls, (formGroup: FormGroup, i: number) => {
            if (formGroup === item) {
                index = i;
            }
        });
        arr.removeAt(index);
    }
    public createItem(controlName, value?) {
        let formGroup: any = null;
        if (controlName === 'addressBook') {
            formGroup = new FormGroup({
                isNew: new FormControl(value ? false : true),
                name: this.getFormControl({value: value ? value.name : '', disabled: !!value}, {required: true, minLength: 2}),
                content: this.getFormControl({value: value ? value.content : '', disabled: !!value}, {
                    required: true,
                    minLength: 10,
                    maxLength: 100
                })
            });
        }
        if (controlName === 'contactInfo') {
            formGroup = new FormGroup({
                isNew: new FormControl(value ? false : true),
                name: this.getFormControl({value: value ? value.name : '', disabled: !!value}, {required: true, minLength: 2}),
                phone: this.getFormControl({value: value ? value.phone : '', disabled: !!value}, {required: true})
            });
        }
        return formGroup;
    }
    public transformUserFieldsToFormGroup(controlName, items: any[]) {
        const transformItems: any[] = [];
        for (let item = 0; item < items.length; item++) {
            transformItems.push(this.createItem(controlName, items[item]));
        }
        return transformItems.sort((item1, item2): number => {
            if (item1.controls.value < item2.controls.value) {
                return -1;
            }
            if (item1.controls.value > item2.controls.value) {
                return 1;
            }
            return 0;
        });
    }
    public saveChangesForm(form: any) {
        const body: User|object = {};
        for (const key in form.controls) {
            if (form.controls.hasOwnProperty(key)) {
                if ('controls' in form.controls[key]) {
                    body[key] = [];
                    form.controls[key].controls.forEach(item => {
                        if ('controls' in item) {
                            const itemGroup = {};
                            for (const itemControl in item.controls) {
                                if (item.controls.hasOwnProperty(itemControl)) {
                                    itemGroup[itemControl] = item.controls[itemControl].value;
                                }
                            }
                            body[key].push(itemGroup);
                        }
                    });
                    continue;
                }
                body[key] = form.controls[key].value;
            }
        }
        this.httpUser.updateProfile(body).subscribe(data => {
            this.stateAnimate = 'active';
            setTimeout(() => {
                this.stateAnimate = 'inactive';
            }, 4000);
            console.log(data);
        });
    }
}
