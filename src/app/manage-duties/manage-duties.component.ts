import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';
import { Duty, Frequency } from '../shared/interfaces';

@Component({ 
  selector: 'app-manage-duties',
  templateUrl: './manage-duties.component.html',
  styleUrls: ['./manage-duties.component.scss']
})

export class ManageDutiesComponent implements OnInit {

  duties:Duty[] = []
  currentDuty:Duty = {
    id: 0,
    title: '',
    frequency: Frequency.oneTime,
    dateStart: new Date().toString(),
  }
  date: Date | undefined;
  optionsFrequency = [{}]
  optionsFrequencyUnit = [{}]

  constructor(private dutiesService: DutiesService) { }

  ngOnInit(): void {
    this.resetSelectedDuty();
    this.loadDutiesByTitle();
    this.optionsFrequency = this.dutiesService.getOptionsFrequency();
    this.optionsFrequencyUnit = this.dutiesService.getOptionsFrequencyUnit();
  }

  loadDutiesByTitle() {
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

  resetSelectedDuty() {
    const emptyDuty = {
      id: 0,
      title: '',
      frequency: Frequency.oneTime,
      dateStart: new Date().toString(),
    }
    this.currentDuty = emptyDuty
  }

  cancel() {
    this.resetSelectedDuty()
  }

  updateDate(date: Date) {
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

  refreshDuties() {
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