import { Observable } from "rxjs/observable";

export abstract class ErrorsTypes {
    public handleCatchError(err: any) {
        console.log(err);
        return Observable.throwError(err);
    }
};