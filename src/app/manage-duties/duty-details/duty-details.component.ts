import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { Duty} from '../../shared/interfaces';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.scss']
})
export class DutyDetailsComponent implements OnInit {
  _currentDuty: Duty | undefined
  date: Date | undefined
 
  @Input() optionsFrequency = [{}];
  @Input() optionsFrequencyUnit = [{}];
  @Output() saved: EventEmitter<Duty> = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() dateUpdated = new EventEmitter();
  
  constructor() { }

  @Input() set currentDuty(value: Duty) {
    this._currentDuty = {
      ...value,
    }
    this.date = new Date(value.dateStart)
  }

  ngOnInit(): void {
  }

  saveWithDate(_currentDuty: Duty){
    if (this.date) {
      _currentDuty.dateStart = this.date.toString()
    }
    this.saved.emit(_currentDuty)
  }


}
