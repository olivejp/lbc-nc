import { Injectable } from '@angular/core';
import { Observable, pipe, Subscriber, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    _messages: ReplaySubject<string>;

    constructor() {
    this._messages = new ReplaySubject<string>();
    }

    log(msg: string) {
        console.log(msg);
    }

    logError(msg: string) {
        console.error(msg);
        this._messages.next(msg);
    }

    getMessages(): ReplaySubject<string> {
        return this._messages;
    }
}
