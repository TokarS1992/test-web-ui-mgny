import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FakeBackendApi } from './interceptors/fake-backend-api';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { ProfileBlockEditComponent } from './components/profile-block-edit/profile-block-edit.component';
import { LocalDirective } from './directives/local.directive';
import { FooterMobileComponent } from './components/footer-mobile/footer-mobile.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProfileComponent,
        ProfileBlockEditComponent,
        LocalDirective,
        FooterMobileComponent
    ],
    imports: [
        TextMaskModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        UserService,
        LoginService,
        AuthGuardGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FakeBackendApi,
          multi: true
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
