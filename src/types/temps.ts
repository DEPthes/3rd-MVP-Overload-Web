export interface Temp {
  id: number;
  title: string;
  createdDate: string;
}

export interface TempsResponse {
  data: Temp[];
}
