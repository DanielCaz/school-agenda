export interface Schedule {
  id?: string;
  days: ScheduleDay[];
}

export interface ScheduleDay {
  name: string;
  items: ScheduleItem[];
}

export interface ScheduleItem {
  subject: Subject;
  start: number;
  duration: number;
  location: Location;
}

export interface Subject {
  id?: string;
  name: string;
}

export interface Location {
  id?: string;
  name: string;
}
