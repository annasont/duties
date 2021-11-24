
export interface Duty {
    id: number;
    title: string;
    frequency: Frequency;
    frequencyNumber?: number;
    frequencyUnit?: FrequencyUnit;
    dateStart: string;
    comment?: string;
  }
  
export enum Frequency {
    oneTime = 'oneTime',
    repeat = 'repeat'
  }
  
export enum FrequencyUnit {
    weeks = 'weeks',
    months = 'months',
    years = 'years',
  }

export interface Week {
  monday: Date,
  sunday: Date
}