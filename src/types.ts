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

export interface ChartDataEntry {
  name: string;
  [appVersion: string]: number | string;
}

export interface MockResponseData {
  app_version: string;
  timestamp: number[];
  "crash.count": number[];
}

export interface MockResponseType {
  data: MockResponseData[];
}
