import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';


import { Log } from '../models/Log';



@Injectable()
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject <Log>( {id: null, text: null, date: null} );
  selectedLog = this.logSource.asObservable();

  constructor() {
    this.logs = [
      {
        id: '1',
        text: 'Generated Components',
        date: new Date('09.03.16 10:45:23')
      },
      {
        id: '2',
        text: 'Added Bootsrsap',
        date: new Date('08.03.16 09:25:23')
      },
      {
        id: '3',
        text: 'Added logs components',
        date: new Date('05.03.16 12:09:23')
      },
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

}
