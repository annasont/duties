import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Week } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-weekly-list',
  templateUrl: './weekly-list.component.html',
  styleUrls: ['./weekly-list.component.scss']
})
export class WeeklyListComponent implements OnInit {
  @Input() fourWeeks: Week [] = [];
  @Output() dutyMarkedDone = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

}
