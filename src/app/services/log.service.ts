import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { Log } from '../models/Log';



@Injectable()
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject <Log>( {id: null, text: null, date: null} );
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject <boolean> (true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated Components',
    //     date: new Date('09.03.16 10:45:23')
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootsrsap',
    //     date: new Date('08.03.16 09:25:23')
    //   },
    //   {
    //     id: '3',
    //     text: 'Added logs components',
    //     date: new Date('05.03.16 12:09:23')
    //   },
    // ];
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    // add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));

  }

  updateLog(log: Log) {
    this.logs.forEach((currentLog, index) => {
      if (log.id === currentLog.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    // update (the logs ) local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  deleteLog(log: Log) {
    this.logs.forEach((currentLog, index) => {
      if (log.id === currentLog.id) {
        this.logs.splice(index, 1);
      }
    });

    // delete (the logs ) frfom local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }


}
