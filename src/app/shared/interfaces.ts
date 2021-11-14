
export interface Duty {
    id: number;
    title: string;
    frequency: Frequency;
    frequencyNumber?: number;
    frequencyUnit?: FrequencyUnit;
    dateStart: Date;
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