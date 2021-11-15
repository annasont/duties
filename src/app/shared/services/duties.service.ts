import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Duty, Frequency, FrequencyUnit } from '../interfaces';

const BASE_URL = 'http://localhost:3000/'
@Injectable({
  providedIn: 'root'
})
export class DutiesService {
  private model = 'duties'
  private duties:Duty[] = [
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

  constructor(private http:HttpClient) { }

  all():Observable<Duty[]> {
    return this.http.get<Duty[]>(`${BASE_URL}${this.model}`)
  }

  allSorted() {
    return this.dutiesSortedAlphabetically
  }

  getOptionsFrequency(){
    return this.optionsFrequency
  }

  getOptionsFrequencyUnit(){
    return this.optionsFrequencyUnit
  }

  find(dutyId: number) {

  }

  create(duty: Duty){
    console.log('created', duty)

  }

  update(duty: Duty){
    console.log('updated', duty)

  }

  delete(dutyId: number){
    console.log('deleted', dutyId)

  }

}

