export interface Temp {
  id: number;
  title: string;
  createdDate: Date;
}

export interface TempsResponse {
  data: Temp[];
}
