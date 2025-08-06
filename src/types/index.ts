
export interface Exercise {
  id: string;
  name: string;
  defaultSeries: number;
  defaultReps: number;
  defaultRepsDuration: number;
  defaultWeight: number;
}

export interface Session {
  id: string;
  date: Date;
  exerciseId: string;
  series: number;
  reps: number;
  repsDuration: number;
  weight: number;
  notes?: string;
}
