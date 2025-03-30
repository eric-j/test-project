export interface CrashData {
  app_version: string;
  "crash.count": number[];
  timestamp: number[];
}

export interface ApiResponse {
  end: string;
  start: string;
  step: number;
  data: CrashData[];
}

export interface TransformedData {
  name: string;
  [key: string]: number | string;
}

export interface DataItem {
  timestamp: number[];
  app_version: string;
  "crash.count": number[];
}
