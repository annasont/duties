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

  constructor(private http:HttpClient) { }

  all():Observable<Duty[]> {
    return this.http.get<Duty[]>(`${BASE_URL}${this.model}`)
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

