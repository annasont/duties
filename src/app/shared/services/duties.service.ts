import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
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
    dateStart: new Date().toString(),
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
    return this.http.get<Duty[]>(this.getUrl())
  }

  getOptionsFrequency(){
    return this.optionsFrequency
  }

  getOptionsFrequencyUnit(){
    return this.optionsFrequencyUnit
  }

  // find(dutyId: number) {

  // }

  create(duty: Duty){
    return this.http.post<Duty[]>(this.getUrl(), duty)
  
  }

  update(duty: Duty){
    return this.http.put<Duty[]>(this.getUrlById(duty), duty)

  }

  delete(duty: Duty){
    return this.http.delete(this.getUrlById(duty))

  }

  getUrl() {
    return `${BASE_URL}${this.model}`
  }

  getUrlById(duty: Duty) {
    return `${this.getUrl()}/${duty.id}`
  }

}

