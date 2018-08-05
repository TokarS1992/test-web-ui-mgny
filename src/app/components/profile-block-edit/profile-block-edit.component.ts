import {Component, OnInit, Inject, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AbstructForm } from '../../utils/abstructForm';

interface IinputsValidate {
    status: boolean;
    text: string;
}

@Component({
    selector: 'app-profile-block-edit',
    templateUrl: './profile-block-edit.component.html',
    styleUrls: ['./profile-block-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileBlockEditComponent extends AbstructForm implements OnInit {
    private isEditing = false;
    @Input() private inputValFirst: string|any;
    @Input() private inputValSecond: FormGroup;
    @Input() private textArea: false;
    @Input() private maskForInputSecond: Array<string | RegExp> = null;
    @Output() private changeStatusItem = new EventEmitter<any>();
    @Output() private actionDeleteItem = new EventEmitter<any>();
    get property() {
        if (this.inputValFirst.constructor.name === 'FormControl') {
            return this.inputValFirst.value;
        }
        return this.inputValFirst;
    }
    get isValidInputVals(): IinputsValidate {
        let isValid = this.inputValFirst && this.inputValSecond.valid;
        if (this.isFormControl(this.inputValFirst)) {
            isValid = this.inputValFirst.valid && this.inputValSecond.valid;
        }
        return {
            status: isValid,
            text: isValid ? 'valid' : 'invalid'
        };
    }
    constructor() {
        super();
    }
    ngOnInit() {}
    public editAction(controls) {
        this.isEditing = !this.isEditing;
        this.changeStatusItem.emit({controls: controls});
    }
}
