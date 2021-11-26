import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';
import { Duty, Week, Frequency } from '../shared/interfaces';

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss']
})

export class MyPlanComponent implements OnInit {
  duties: Duty[] = []
  lastMonday = this.getMonday(new Date())
  sunday = this.getSunday(this.lastMonday)
  weeks: Week[] = [];

  constructor(private dutiesService: DutiesService) { }

  ngOnInit(): void {
    this.loadDutiesByDate();
  }

  sortByDate(duties: Duty[]) {
    return duties.sort(
      function(a: Duty, b: Duty){
        let dateA: string = a.dateStart;
        let dateB: string = b.dateStart;
        return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
      }
    )
  }

  loadDutiesByDate() {
    this.dutiesService.all().subscribe(
      (duties) => 
      { 
        this.duties = this.sortByDate(duties);
        this.weeks = this.loadCurrentWeeks(this.duties);
      },
      (error) => console.log(`loadDutiesByDate error`, error)
    );
  }

  getMonday(d: Date) {
    d = new Date(d);
    let day = d.getDay();
    let diff = d.getDate() - day + (day == 0 ? -6:1); 
    return new Date(d.setDate(diff));
  }

  getSunday(d: Date) {
    d = new Date(d)
    let diff = d.getDate() + 6
    return new Date(d.setDate(diff));
  }


  sortDutiesByWeeks(duties: Duty[], monday: Date, sunday: Date): Duty[]{
    let sortedDuties = [];
    for (let duty of duties) {
      let dateFormat: Date = new Date(duty.dateStart)
      if (dateFormat > monday && dateFormat <= sunday) {
        sortedDuties.push(duty)
      }
    }
    return sortedDuties
  }

  loadCurrentWeeks(duties: Duty[]): Week[] {
    let mon = this.getMonday(new Date());
    let sun = this.getSunday(mon);
    let weeks: Week[] = []

    let x = 0
    while (x < 4) {
      let d1 = new Date(mon);
      let d2 = new Date(sun);
      let diff1 = d1.getDate();
      let diff2 = d2.getDate();
      mon = new Date(d1.setDate(diff1));
      sun = new Date(d2.setDate(diff2));
      let sortedDuties = this.sortDutiesByWeeks(duties, mon, sun)

      if (sortedDuties.length != 0) {
        weeks.push(
          {
          monday: mon,
          sunday: sun,
          duties: sortedDuties
          }
        )
      } else {
        weeks.push(
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
    return weeks
  }
  
}
