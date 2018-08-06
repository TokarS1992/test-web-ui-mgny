import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { AbstructForm } from '../../utils/abstructForm';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent extends AbstructForm implements OnInit {
    private formLogin: FormGroup;
    private minLengthPass = 6;
    private maxLengthPass = 18;
    constructor(
        private httpLogin: LoginService,
        private router: Router
    ) {
        super();
    }
    ngOnInit() {
        this.formLogin = new FormGroup({
            email: this.getFormControl('', {required: true, email: true, maxLength: 50}),
            password: this.getFormControl('', {
                required: true,
                minLength: this.minLengthPass,
                maxLength: this.maxLengthPass,
                pattern: `[a-zA-Z0-9]+`
            })
        });
    }
    public login(form: FormGroup) {
        if (this.checkControlMarkAsTouched(form)) {
            const { email, password } = form.controls;
            this.httpLogin.login(email.value, password.value).subscribe((data: User) => {
                this.router.navigate(['/profile']);
            });
        }
    }
}
