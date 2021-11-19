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
    this.loadDuties();
    this.optionsFrequency = this.dutiesService.getOptionsFrequency();
    this.optionsFrequencyUnit = this.dutiesService.getOptionsFrequencyUnit();
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

  updateDate(date: Date) {
    this.currentDuty.dateStart = date.toString()
  }

  saveDuty(duty: Duty) {
    if (duty.id == 0) {
      this.dutiesService.create(duty)
      .subscribe(
        result => this.loadDuties(), 
        error => console.log(`saveDuty error`, error)
      );
    } else {
      this.dutiesService.update(duty)
      .subscribe(
        result => console.log("Updated!", result),
        error => console.log(`saveDuty error`, error)
      )
    }
  }

  cancel() {
    this.resetSelectedDuty()
  }

  delete(duty: Duty) {
    this.selectDuty(duty);
    this.dutiesService.delete(duty.id)
  }

  

}