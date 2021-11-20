import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Duty, Frequency } from '../../shared/interfaces';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.scss']
})
export class DutyDetailsComponent implements OnInit {

  @Input() currentDuty:Duty = {
    id: 0,
    title: '',
    frequency: Frequency.oneTime,
    dateStart: new Date().toString(),
  }; 
  @Input() optionsFrequency = [{}];
  @Input() optionsFrequencyUnit = [{}];
  @Input() date: Date | undefined;
  @Output() saved = new EventEmitter;
  @Output() canceled = new EventEmitter;
  @Output() dateUpdated = new EventEmitter;


  constructor() { }

  ngOnInit(): void {
  }

}
