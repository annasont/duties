import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Duty, Frequency, FrequencyUnit } from '../../shared/interfaces';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.scss']
})
export class DutyDetailsComponent implements OnInit {

  @Input() currentDuty: Duty | undefined;
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
