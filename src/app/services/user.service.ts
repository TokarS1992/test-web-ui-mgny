import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from "rxjs/observable";
import { ErrorsTypes } from '../utils/abstructError';
import { User } from '../interfaces/user';

@Injectable()
export class UserService extends ErrorsTypes {
    constructor(
        private http: HttpClient
    ) {
        super();
    }
    public getUserLocal() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    public updateProfile(body: User|any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/update', body, {headers: headers}).pipe(
            map((data: User) => data),
            catchError(this.handleCatchError)
        );
    }
}
