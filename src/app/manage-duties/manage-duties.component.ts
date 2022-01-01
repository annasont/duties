import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';
import { Duty } from '../shared/interfaces';

@Component({ 
  selector: 'app-manage-duties',
  templateUrl: './manage-duties.component.html',
  styleUrls: ['./manage-duties.component.scss']
})

export class ManageDutiesComponent implements OnInit {

  duties:Duty[] = [];
  currentDuty: Duty;
  optionsFrequency = [{}];
  optionsFrequencyUnit = [{}];
  private date: Date | undefined;

  constructor(private dutiesService: DutiesService) { 
   this.currentDuty = dutiesService.createEmptyDuty();
  }

  ngOnInit(): void {
    this.dutiesService.loadDutiesByTitle().subscribe(duties => this.duties = duties);
    this.optionsFrequency = this.dutiesService.getOptionsFrequency();
    this.optionsFrequencyUnit = this.dutiesService.getOptionsFrequencyUnit();
  }

  selectDuty(duty: Duty) {
    this.currentDuty = duty;
    this.date = new Date(duty.dateStart);
  }

  saveDuty(duty: Duty) {
    this.dutiesService.saveDuty(duty)
    .subscribe(
      (dutySaved) => {
        let isNew = duty.id == 0;
        if (isNew) {
          this.addToList(dutySaved);
        } else {
          this.updateList(dutySaved);
        }
        this.resetSelectedDuty();
      },
      error => console.log(`saveDuty create error`, error)
    )
  }

  private addToList(dutySaved: Duty) {
    this.duties = this.dutiesService.sortByTitle([...this.duties, dutySaved]);
  }

  private updateList(dutySaved:Duty){
    this.duties.splice(this.duties.findIndex((element: Duty) => element.id == dutySaved.id), 1, dutySaved);
    this.duties = this.dutiesService.sortByTitle(this.duties);
  }
  
  delete(duty: Duty) {
    this.dutiesService.delete(duty).subscribe(
      () => {
        this.duties.splice(this.duties.findIndex((element: Duty) => element == duty), 1);
      },
      error => console.log(`delete error`, error)
    );
  }

  cancel() {
    this.resetSelectedDuty()
  }

  private resetSelectedDuty() {
    this.currentDuty = this.dutiesService.createEmptyDuty()
  }

}