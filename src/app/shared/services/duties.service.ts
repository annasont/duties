import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DutiesService {
  duties:Duty[] = [
    {
      id: 1,
      title: 'Mycie OKIEN',
      frequency: Frequency.repeat,
      frequencyNumber: 3,
      frequencyUnit: FrequencyUnit.years,
      dateStart: new Date,
      comment: 'Najnudniejsza praca'
    },
    {
      id: 2,
      title: 'Kupienie lodowki',
      frequency: Frequency.oneTime,
      dateStart: new Date,
      comment: 'Koniecznie klasa A+++'
    },  
    {
      id: 3,
      title: 'Bazgranie',
      frequency: Frequency.repeat,
      frequencyNumber: 4,
      frequencyUnit: FrequencyUnit.weeks,
      dateStart: new Date,
    }
  ]

  emptyDuty = {
    id: 0,
    title: '',
    frequency: Frequency.oneTime,
    dateStart: new Date,
  }

  currentDuty: Duty = this.emptyDuty

  optionsFrequency = [
    {
      name: 'one-time',
      value: Frequency.oneTime
    },
    {
      name: 'repeat',
      value: Frequency.repeat
    }
  ]

  optionsFrequencyUnit = [
    {
      name: 'week(s)',
      value: FrequencyUnit.weeks
    },
    {
      name: 'month(s)',
      value: FrequencyUnit.months
    },
    {
      name: 'year(s)',
      value: FrequencyUnit.years
    }
  ]

  dutiesSortedAlphabetically = this.duties.sort(function(a: Duty, b: Duty){
    let textA: string = a.title.toUpperCase();
    let textB: string = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })

  constructor() { }
}

interface Duty {
  id: number;
  title: string;
  frequency: Frequency;
  frequencyNumber?: number;
  frequencyUnit?: FrequencyUnit;
  dateStart: Date;
  comment?: string;
}

enum Frequency {
  oneTime = 'oneTime',
  repeat = 'repeat'
}

enum FrequencyUnit {
  weeks = 'weeks',
  months = 'months',
  years = 'years',
}