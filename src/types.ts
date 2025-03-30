export interface CrashData {
  app_version: string;
  crash_count: number[];
  timestamp: number[];
  device_type: string;
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
  device_type: string;
  timestamp: number[];
  app_version: string;
  crash_count: number[];
}
