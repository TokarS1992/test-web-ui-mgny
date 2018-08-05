import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { of } from 'rxjs';
import { Observable } from 'rxjs/observable';
import 'rxjs-compat';
import { User } from '../interfaces/user';

@Injectable()
export class FakeBackendApi implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return Observable.of(null).mergeMap(() => {
            if (request.url.endsWith('/api/login') && request.method === 'POST') {
                const body = request.body;
                if (JSON.parse(localStorage.getItem('currentUser'))) {
                    localStorage.removeItem('currentUser');
                }
                const testObj = {
                    name: 'test',
                    content: 'dsgdfhdfndfgf'
                };
                const currentUser: User = {
                    name: 'Test',
                    password: body.password,
                    email: body.email,
                    addressBook: [],
                    contactInfo: []
                };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                return Observable.of(new HttpResponse({ status: 200, body: currentUser }));
            }
            if (request.url.endsWith('/api/update') && request.method === 'PUT') {
                const body = request.body;
                localStorage.setItem('currentUser', JSON.stringify(body));
                return Observable.of(new HttpResponse({ status: 200, body: body }));
            }
        });
    }
}
