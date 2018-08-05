import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from "rxjs/observable";
import { ErrorsTypes } from '../utils/abstructError';
import { User } from '../interfaces/user';

@Injectable()
export class LoginService extends ErrorsTypes {

    constructor(
      private http: HttpClient
    ) {
        super();
    }
    public login(email: any, password: any): Observable<User>  {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/login', {email: email, password: password}, {headers: headers}).pipe(
            map((data: User) => {
                return data;
            }),
            catchError(this.handleCatchError)
        );
    }
}
