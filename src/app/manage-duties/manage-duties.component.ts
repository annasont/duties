import { Component, OnInit } from '@angular/core';
import { DutiesService } from '../shared/services/duties.service';

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
    dateStart: new Date,
  }
  optionsFrequency = [{}]
  optionsFrequencyUnit = [{}]
  dutiesSortedAlphabetically = [{}]

  constructor(private dutiesService: DutiesService) { }

  ngOnInit(): void {
    this.resetSelectedDuty();
    this.duties = this.dutiesService.duties;
    this.dutiesSortedAlphabetically = this.dutiesService.dutiesSortedAlphabetically;
    this.optionsFrequency = this.dutiesService.optionsFrequency;
    this.optionsFrequencyUnit = this.dutiesService.optionsFrequencyUnit;
  }

  selectDuty(duty: Duty) {
    console.log('SELECT DUTY FIRED', duty)
    this.currentDuty = duty;
  }
  
  saveDuty() {
    console.log("SAVED!!!")
  }

  resetSelectedDuty() {
    const emptyDuty = {
      id: 0,
      title: '',
      frequency: Frequency.oneTime,
      dateStart: new Date,
    }
    this.currentDuty = emptyDuty
  }

  cancel() {
    this.resetSelectedDuty()
    console.log("CANCELED")
  }

}

interface Duty {
  id: number;
  title: string;
  frequency: Frequency;
  frequencyNumber?: number;
  frequencyUnit?: FrequencyUnit;
  dateStart: Date;
  comment?: string;
}

enum Frequency {
  oneTime = 'oneTime',
  repeat = 'repeat'
}

enum FrequencyUnit {
  weeks = 'weeks',
  months = 'months',
  years = 'years',
}