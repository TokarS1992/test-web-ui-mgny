import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuardGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
