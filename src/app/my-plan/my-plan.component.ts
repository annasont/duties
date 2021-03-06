import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';
import { Duty, Week, Frequency, FrequencyUnit } from '../shared/interfaces';

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss']
})

export class MyPlanComponent implements OnInit {
  private duties: Duty[] = []
  private dutiesWithRepetition: Duty[] = []
  fourWeeks: Week[] = [];

  constructor(private dutiesService: DutiesService) { }

  ngOnInit(): void {
    this.loadDutiesByDate();
  }

  private loadDutiesByDate() {
    this.dutiesService.loadDuties().subscribe((duties) => 
      {
        this.duties = duties
        this.dutiesWithRepetition = this.duplicateRepeatableDuties(duties);
        this.fourWeeks = this.loadCurrentWeeks(this.dutiesWithRepetition);
      },
      (error) => console.log(`loadDutiesByDate error`, error)
    );  
  }

  private duplicateRepeatableDuties(duties: Duty[]) {
    let repeatDuties: Duty[] = []
    for (let duty of duties) {
      if (duty.frequencyNumber) {
        let firstOccurene = new Date(duty.dateStart)
        let d = new Date(firstOccurene)
        let year = d.getFullYear();
        let month = d.getMonth();
        let day = d.getDate();
        let in5years = new Date(year + 10, month, day)
        
        if (duty.frequencyUnit == FrequencyUnit.weeks) {
          day += 7 * duty.frequencyNumber
          let x = new Date (year, month, day) 
          while (x < in5years) {
            this.addDuties(repeatDuties, x, duty)
            day += 7 * duty.frequencyNumber
            x = new Date (year, month, day)   
          }   
        } else if (duty.frequencyUnit == FrequencyUnit.months) {
          month += 1 * duty.frequencyNumber
          let x = new Date (year, month, day) 
          while (x < in5years) {
            this.addDuties(repeatDuties, x, duty)
            month += 1 * duty.frequencyNumber
            x = new Date (year, month, day)   
          }
        } else if (duty.frequencyUnit == FrequencyUnit.years) {
          year += 1 * duty.frequencyNumber
          let x = new Date (year, month, day) 
          while (x < in5years) {
            this.addDuties(repeatDuties, x, duty)
            year += 1 * duty.frequencyNumber
            x = new Date (year, month, day)   
          }
        }
      }
    } 
    for (let duty of repeatDuties) {
      duties.push(duty)
    }

    return duties
  }

  private addDuties(repeatDuties:Duty[], x: Date, duty: Duty) {
    if (duty.comment) {
      repeatDuties.push({
        id: 0,
        title: duty.title,
        frequency: duty.frequency,
        frequencyUnit: duty.frequencyUnit,
        dateStart: x.toString(),
        frequencyNumber: duty.frequencyNumber,
        comment: duty.comment,
        statusIfDone: false,
      })
    } else {
      repeatDuties.push({
        id: 0,
        title: duty.title,
        frequency: duty.frequency,
        frequencyUnit: duty.frequencyUnit,
        dateStart: x.toString(),
        frequencyNumber: duty.frequencyNumber,
        statusIfDone: false,
      })
    }
  }

  private loadCurrentWeeks(duties: Duty[]): Week[] {
    let mon = this.getMonday(new Date());
    let sun = this.getSunday(mon);
    let fourWeeks: Week[] = []

    let x = 0
    while (x < 4) {
      let d1 = new Date(mon);
      let d2 = new Date(sun);
      let diff1 = d1.getDate();
      let diff2 = d2.getDate();
      mon = new Date(d1.setDate(diff1));
      sun = new Date(d2.setDate(diff2));
      let sortedDuties = this.sortDutiesByWeeks(duties, mon, sun)
      this.sortByDate(sortedDuties);

      if (sortedDuties.length != 0) {
        fourWeeks.push(
          {
          monday: mon,
          sunday: sun,
          duties: sortedDuties
          }
        )
      } else {
        fourWeeks.push(
          {
          monday: mon,
          sunday: sun
          }
        )
      };

      x++;
      diff1 = d1.getDate() + 7;
      diff2 = d2.getDate() + 7;
      mon = new Date(d1.setDate(diff1));
      sun = new Date(d2.setDate(diff2));
    } 
    return fourWeeks
  }

  private getMonday(d: Date) {
    d = new Date(d);
    let day = d.getDay();
    let diff = d.getDate() - day + (day == 0 ? -6:1); 
    let monday = new Date(d.setDate(diff));
    monday.setHours(0,0,0,0)
    return monday;
  }

  private getSunday(d: Date) {
    d = new Date(d)
    let diff = d.getDate() + 6
    return new Date(d.setDate(diff));
  }

  private sortDutiesByWeeks(duties: Duty[], monday: Date, sunday: Date): Duty[]{
    let sortedDuties = [];
    for (let duty of duties) {
      let dateFormat: Date = new Date(duty.dateStart)
      if (dateFormat >= monday && dateFormat <= sunday) {
        sortedDuties.push(duty)
      }
    }
    return sortedDuties
  }

  private sortByDate(duties: Duty[]) {
    return duties.sort(
      function(a: Duty, b: Duty){
        let dateA: Date = new Date(a.dateStart);
        let dateB: Date = new Date(b.dateStart);
        return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
      }
    )
  }

  dutyMarkedDone(duty: Duty){
    duty.statusIfDone = !duty.statusIfDone;
    this.dutiesService.saveDuty(duty)
    .subscribe(
      (duty) => {
        if (duty.id == 0) {
          this.duties = [...this.duties, duty];
        } else {
          this.duties.splice(this.duties.findIndex((element: Duty) => element.id == duty.id), 1, duty)
          this.duties = [...this.duties, duty];
        }
      },
      error => console.log(`dutyMarkedDone error`, error)
    )
  }
}
