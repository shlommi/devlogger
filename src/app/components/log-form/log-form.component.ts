import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew = true;

  constructor( private logService: LogService ) { }

  ngOnInit() {
    // subscribe to the selectedLog Observable
    this.logService.selectedLog.subscribe(log => {
      if (log.text !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    // check if new log
    if (this.isNew) {
      // create new log
      const newLog = {
        id: this.generatId(),
        text: this.text,
        date: new Date()
      };
      // add the new log (with the service)
       this.logService.addLog(newLog);
    } else {
      // create log  to be updated
       const updLog = {
         id: this.id,
         text: this.text,
         date: new Date()
       };
       // use service to update log
       this.logService.updateLog(updLog);
    }

      // clean state
      this.cleanState();
  }

  cleanState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.logService.clearState();
  }

  generatId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r &0x3 | 0x8);
        return v.toString(16);
      });
  }

}
