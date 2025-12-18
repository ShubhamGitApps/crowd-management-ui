export interface LiveOccupancyPayload {
  ts: number;
  siteId: string;
  siteOccupancy: number;
  genderCount: {
    male: number;
    female: number;
  };
  zoneId?: string;
  zoneOccupancy?: number;
}