import { Duty } from '../shared/interfaces'
import { DutiesService } from './services/duties.service';

export function saveDuty(duty: Duty, dutiesService: DutiesService, refreshDuties: any) {
    if (duty.id == 0) {
      dutiesService.create(duty)
      .subscribe(
        result => refreshDuties(), 
        error => console.log(`saveDuty create error`, error)
      );
    } else {
      dutiesService.update(duty)
      .subscribe(
        result => refreshDuties(),
        error => console.log(`saveDuty update error`, error)
      );
    }
  }

export function refreshDuties(loadDutiesByTitle:any, resetSelectedDuty:any) {
  loadDutiesByTitle();
  resetSelectedDuty();
}

export function loadDutiesByTitle(dutiesService: DutiesService, duties: Duty[]) {
  dutiesService.all().subscribe(
    (duties) => duties = duties.sort(function(a: Duty, b: Duty){
    let textA: string = a.title.toUpperCase();
    let textB: string = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }),
    (error) => console.log(`loadDutiesByTitile error`, error)
  );
} 

export function resetSelectedDuty(currentDuty: Duty, createEmptyDuty: any) {
  currentDuty = createEmptyDuty()
}