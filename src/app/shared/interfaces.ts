
export interface Duty {
    id: number;
    title: string;
    frequency: Frequency;
    frequencyNumber?: number;
    frequencyUnit?: FrequencyUnit;
    dateStart: string;
    comment?: string;
    statusIfDone: boolean;
  }
  
export enum Frequency {
    oneTime = 'oneTime',
    repeat = 'repeat'
  }

export interface OptionsFrequency {
  name: string;
  value: Frequency;
}

export interface OptionsFrequencyUnit {
  name: string;
  value: FrequencyUnit;
}

export enum FrequencyUnit {
    weeks = 'weeks',
    months = 'months',
    years = 'years',
  }

export interface Week {
  monday: Date,
  sunday: Date,
  duties?: Duty[]
}