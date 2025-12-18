export interface AlertPayload {
  ts: number;
  eventId: string;
  personId: string;
  personName: string;
  direction: 'entry' | 'exit';
  severity: 'low' | 'medium' | 'high';
  siteId: string;
  siteName: string;
  zoneId: string;
  zoneName: string;
}
