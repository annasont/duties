import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-duties',
  templateUrl: './manage-duties.component.html',
  styleUrls: ['./manage-duties.component.scss']
})

export class ManageDutiesComponent implements OnInit {

  duties:Duty[] = [
    {
      id: 1,
      title: 'Mycie okien',
      frequency: Frequency.repeat,
      frequencyNumber: 3,
      frequencyUnit: FrequencyUnit['week(s)'],
      dateStart: new Date,
    },
    {
      id: 2,
      title: 'Kupienie lodowki',
      frequency: Frequency['one-time'],
      dateStart: new Date,
    },
    {
      id: 3,
      title: 'Bazgranie',
      frequency: Frequency.repeat,
      frequencyNumber: 4,
      frequencyUnit: FrequencyUnit['year(s)'],
      dateStart: new Date,
    }
  ]

  
  dutiesSortedAlphabetically = this.duties.sort(function(a: Duty, b: Duty){
    let textA: string = a.title.toUpperCase();
    let textB: string = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })


  constructor() { }

  ngOnInit(): void {
  }

}

interface Duty {
  id: number;
  title: string;
  frequency: Frequency;
  frequencyNumber?: number;
  frequencyUnit?: FrequencyUnit;
  dateStart: Date;
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