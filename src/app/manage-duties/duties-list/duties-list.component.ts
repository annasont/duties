import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Duty } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-duties-list',
  templateUrl: './duties-list.component.html',
  styleUrls: ['./duties-list.component.scss']
})
export class DutiesListComponent implements OnInit {
  
  @Input() duties: Duty[] = [];
  @Output() selected = new EventEmitter;
  @Output() deleted = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

}
