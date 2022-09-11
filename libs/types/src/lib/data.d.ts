export interface ResumeEntry {
  title: string;
  years: (string | number)[];
  url: string;
  location?: string;
}

export interface ResumeData {
  work: ResumeEntry[];
  education: ResumeEntry[];
  certificates: ResumeEntry[];
}

export interface TravelMarker {
  title: string;
  lat: number;
  lng: number;
}
