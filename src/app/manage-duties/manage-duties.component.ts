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
    dateStart: new Date,
  }
  optionsFrequency = [{}]
  optionsFrequencyUnit = [{}]
  dutiesSortedAlphabetically = [{}]

  constructor(private dutiesService: DutiesService) { }

  ngOnInit(): void {
    this.resetSelectedDuty();
    this.duties = this.dutiesService.all();
    this.dutiesSortedAlphabetically = this.dutiesService.allSorted();
    this.optionsFrequency = this.dutiesService.getOptionsFrequency();
    this.optionsFrequencyUnit = this.dutiesService.getOptionsFrequencyUnit();
  }

  selectDuty(duty: Duty) {
    this.currentDuty = duty;
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

  saveDuty(duty: Duty) {
    if (duty.id) {
      this.dutiesService.update(duty)
    } else {
      this.dutiesService.create(duty)
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