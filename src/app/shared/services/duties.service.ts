import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Duty, Frequency, FrequencyUnit } from '../interfaces';
import { AppService } from './app.service'

const BASE_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})

export class DutiesService {
  
  private optionsFrequency = [
    {
      name: 'one-time',
      value: Frequency.oneTime
    },
    {
      name: 'repeat',
      value: Frequency.repeat
    }
  ]

  private optionsFrequencyUnit = [
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

  constructor(private appService:AppService) { }

  getOptionsFrequency(){
    return this.optionsFrequency
  }

  getOptionsFrequencyUnit(){
    return this.optionsFrequencyUnit
  }

  loadDutiesByTitle() {
    return this.appService.all().pipe(
      map((duties) => duties.sort(function(a: Duty, b: Duty){
        let textA: string = a.title.toUpperCase();
        let textB: string = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })));
  } 
  

  createEmptyDuty(): Duty {
    return {
      id: 0,
      title: '',
      frequency: Frequency.oneTime,
      frequencyUnit: FrequencyUnit.weeks,
      dateStart: new Date().toString(),
      statusIfDone: false,
    }
  }


  saveDuty(duty: Duty): Observable<Duty> {
    if (duty.id == 0) {
      return this.appService.create(duty)
      // .subscribe(
      //   result => this.refreshDuties(duties, duty), 
      //   error => console.log(`saveDuty create error`, error)
      // );
    } else {
      return this.appService.update(duty)
      // .subscribe(
      //   result => this.refreshDuties(duties, duty),
      //   error => console.log(`saveDuty update error`, error)
      // );
    } 
  }
    

  delete(duty: Duty): Observable<void> {
    return this.appService.delete(duty)
    // .subscribe(
    //   result => this.refreshDuties(duties, duty),
    //   error => console.log(`delete error`, error)
    // );
  }
  
  

}

