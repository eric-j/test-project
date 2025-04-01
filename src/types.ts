export interface ChartDataEntry {
  time: string;
  [appVersion: string]: number | string;
}

export interface MockResponseData {
  app_version: string;
  timestamp: number[];
  "crash.count": number[];
}

export interface MockResponseType {
  data: MockResponseData[];
  end: string;
  start: string;
  step: number;
}

export interface VersionData {
  time: string;
  [appVersion: string]: number | string;
}
