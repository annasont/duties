import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-duties',
  templateUrl: './manage-duties.component.html',
  styleUrls: ['./manage-duties.component.scss']
})

export class ManageDutiesComponent implements OnInit {

  duties:Duty[] = [
    {
      title: 'Mycie okien',
      frequency: Frequency.repeat,
      frequencyNumber: 3,
      frequencyUnit: FrequencyUnit['week(s)'],
      dateStart: new Date,
    },
    {
      title: 'Kupienie lodowki',
      frequency: Frequency['one-time'],
      dateStart: new Date,
    },
    {
      title: 'Bazgranie',
      frequency: Frequency.repeat,
      frequencyNumber: 4,
      frequencyUnit: FrequencyUnit['year(s)'],
      dateStart: new Date,
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

interface Duty {
  title: string
  frequency: Frequency,
  frequencyNumber?: number,
  frequencyUnit?: FrequencyUnit,
  dateStart: Date,
}

enum Frequency {
  'one-time',
  'repeat'
}

enum FrequencyUnit {
  'week(s)',
  'month(s)',
  'year(s)',
}