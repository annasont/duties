import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';
import { Duty } from '../shared/interfaces';

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss']
})
export class MyPlanComponent implements OnInit {
  duties:Duty[] = []


  constructor(private dutiesService: DutiesService) { }

  ngOnInit(): void {
    this.loadDuties();
  }

  loadDuties() {
    this.dutiesService.all().subscribe(
      (duties) => this.duties = duties.sort(function(a: Duty, b: Duty){
      let textA: string = a.title.toUpperCase();
      let textB: string = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }),
      (error) => console.log(`loadDuties error`, error)
    );
  }

}
