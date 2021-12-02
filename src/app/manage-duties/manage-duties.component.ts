import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';
import { Duty } from '../shared/interfaces';
import { switchMap } from 'rxjs/operators';

@Component({ 
  selector: 'app-manage-duties',
  templateUrl: './manage-duties.component.html',
  styleUrls: ['./manage-duties.component.scss']
})

export class ManageDutiesComponent implements OnInit {

  duties:Duty[] = []
  currentDuty: Duty;
  date: Date | undefined;
  optionsFrequency = [{}]
  optionsFrequencyUnit = [{}]

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
    .pipe(
      switchMap(() => this.dutiesService.loadDutiesByTitle())
    )
    .subscribe(
      (duties) => this.refreshDuties(duties), 
      error => console.log(`saveDuty create error`, error)
    )
  }

  refreshDuties(duties: Duty[]) {
    this.duties = duties;
    this.resetSelectedDuty();
  }

  delete(duty: Duty) {
    this.dutiesService.delete(duty).subscribe(
      () => {
        function isDuty(element: Duty){
          return element = duty
        }
        this.duties.splice(this.duties.findIndex(isDuty), 1);
      },
      error => console.log(`delete error`, error)
    );
  }

  cancel() {
    this.resetSelectedDuty()
  }

  resetSelectedDuty() {
    this.currentDuty = this.dutiesService.createEmptyDuty()
  }

  updateDate(date: Date) {
    if (!this.currentDuty) { 
      throw new Error('Missing current duty');
    }
    this.currentDuty.dateStart = date.toString()
  }



}