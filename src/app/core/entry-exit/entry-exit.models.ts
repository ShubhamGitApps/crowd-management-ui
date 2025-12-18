export interface EntryExitRecord {
  personId: string;
  personName: string;
  gender: string;
  zoneId: string;
  zoneName: string;
  severity: string;
  entryUtc: number;
  entryLocal: string;
  exitUtc: number;
  exitLocal: string;
  dwellMinutes: number;
}

export interface EntryExitResponse {
  siteId: string;
  totalRecords: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  records: EntryExitRecord[];
}
