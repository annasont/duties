import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';
import { Duty } from '../shared/interfaces';


@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss']
})
export class MyPlanComponent implements OnInit {
  duties: Duty[] = []
  lastMonday = this.getMonday(new Date())
  sunday = this.getSunday(this.lastMonday)
  weeks= [
    {
      monday: this.lastMonday,
      sunday: this.sunday
    },
    {
      monday: this.sunday,
      sunday: this.sunday
    },
    {
      monday: this.lastMonday,
      sunday: this.lastMonday
    }
  ]


  constructor(private dutiesService: DutiesService) { }

  ngOnInit(): void {
    this.loadDutiesByDate();
  }

  getMonday(d: Date) {
    d = new Date(d);
    let day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:1); 
    return new Date(d.setDate(diff));
  }

  getSunday(d: Date) {
    d = new Date(d)
    let day = d.getDay(),
    diff = d.getDate() + 6
    return new Date(d.setDate(diff));
  }

  loadDutiesByDate() {
    this.dutiesService.all().subscribe(
      (duties) => this.duties = duties.sort(function(a: Duty, b: Duty){
      let dateA: string = a.dateStart;
      let dateB: string = b.dateStart;
      return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
    }),
      (error) => console.log(`loadDutiesByDate error`, error)
    );
  }

  

}
