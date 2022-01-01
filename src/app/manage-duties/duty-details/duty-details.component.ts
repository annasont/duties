import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { Duty, OptionsFrequency, OptionsFrequencyUnit} from '../../shared/interfaces';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.scss']
})
export class DutyDetailsComponent implements OnInit {
  _currentDuty: Duty | undefined
  date: Date | undefined 
 
  @Input() optionsFrequency: OptionsFrequency[] = [];
  @Input() optionsFrequencyUnit: OptionsFrequencyUnit[] = [];
  @Output() saved = new EventEmitter<Duty>();
  @Output() canceled = new EventEmitter<void>();
  
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
