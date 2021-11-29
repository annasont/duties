import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Duty, Frequency, FrequencyUnit } from '../../shared/interfaces';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.scss']
})
export class DutyDetailsComponent implements OnInit {
  _currentDuty: Duty | undefined


  // @Input() currentDuty: Duty | undefined;
  @Input() optionsFrequency = [{}];
  @Input() optionsFrequencyUnit = [{}];
  @Output() saved = new EventEmitter;
  @Output() canceled = new EventEmitter;
  @Output() dateUpdated = new EventEmitter;
  
  date: Date | undefined;


  constructor() { }

  @Input() set currentDuty(value: Duty) {
    this._currentDuty = Object.assign({}, value)
  }

  ngOnInit(): void {
  }

}
