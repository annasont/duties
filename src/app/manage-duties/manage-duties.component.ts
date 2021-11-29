import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';
import { Duty, Frequency, FrequencyUnit } from '../shared/interfaces';

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
   this.currentDuty = this.createEmptyDuty();
  }

  ngOnInit(): void {
    this.loadDutiesByTitle();
    this.optionsFrequency = this.dutiesService.getOptionsFrequency();
    this.optionsFrequencyUnit = this.dutiesService.getOptionsFrequencyUnit();
  }

  private loadDutiesByTitle() {
    this.dutiesService.all().subscribe(
      (duties) => this.duties = duties.sort(function(a: Duty, b: Duty){
      let textA: string = a.title.toUpperCase();
      let textB: string = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }),
      (error) => console.log(`loadDutiesByTitile error`, error)
    );
  } 

  selectDuty(duty: Duty) {
    this.currentDuty = duty;
    this.date = new Date(duty.dateStart);
  }

  private createEmptyDuty(): Duty {
    return {
      id: 0,
      title: '',
      frequency: Frequency.oneTime,
      frequencyUnit: FrequencyUnit.weeks,
      dateStart: new Date().toString(),
    }
  }

  cancel() {
    this.resetSelectedDuty()
  }

  private resetSelectedDuty() {
    this.currentDuty = this.createEmptyDuty()
  }

  updateDate(date: Date) {
    if (!this.currentDuty) { 
      throw new Error('Missing current duty');
    }
    this.currentDuty.dateStart = date.toString()
  }

  saveDuty(duty: Duty) {
    if (duty.id == 0) {
      this.dutiesService.create(duty)
      .subscribe(
        result => this. refreshDuties(), 
        error => console.log(`saveDuty create error`, error)
      );
    } else {
      this.dutiesService.update(duty)
      .subscribe(
        result => this. refreshDuties(),
        error => console.log(`saveDuty update error`, error)
      );
    }
  }

  private refreshDuties() {
    this.loadDutiesByTitle();
    this.resetSelectedDuty();
  }

  delete(duty: Duty) {
    this.selectDuty(duty);
    this.dutiesService.delete(duty)
    .subscribe(
      result => this. refreshDuties(),
      error => console.log(`delete error`, error)
    );
  }
}