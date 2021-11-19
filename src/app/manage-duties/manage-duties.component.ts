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

  constructor(private dutiesService: DutiesService) { }

  ngOnInit(): void {
    this.resetSelectedDuty();
    this.dutiesService.all().subscribe(duties => this.duties = duties.sort(function(a: Duty, b: Duty){
      let textA: string = a.title.toUpperCase();
      let textB: string = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }));
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
      .subscribe(result => console.log("i co my tu mamy?", result))
    } else {
      this.dutiesService.create(duty)
      .subscribe(result => console.log('Tu cos innego!', result))
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