export interface FootfallResponse {
  siteId: string;
  fromUtc: number;
  toUtc: number;
  footfall: number;
}

export interface DwellResponse {
  siteId: string;
  fromUtc: number;
  toUtc: number;
  avgDwellMinutes: number;
  dwellRecords: number;
}

export interface OccupancyBucket {
  utc: number;
  local: string;
  avg: number;
}

export interface OccupancyResponse {
  siteId: string;
  fromUtc: number;
  toUtc: number;
  timezone: string;
  buckets: OccupancyBucket[];
}

export interface DemographicsBucket {
  utc: number;
  local: string;
  male: number;
  female: number;
}

export interface DemographicsResponse {
  siteId: string;
  fromUtc: number;
  toUtc: number;
  timezone: string;
  buckets: DemographicsBucket[];
}
