import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntryExitResponse } from './entry-exit.models';
import { SiteContextService } from '../sites/site-context.service';
import { getUtcRangeMillis } from '../dashboard/analytics.utils';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({ providedIn: 'root' })
export class EntryExitService {

  constructor(
    private http: HttpClient,
    private siteContext: SiteContextService
  ) {}

  getEntryExit(pageNumber = 1, pageSize = 50) {
    return this.http.post<EntryExitResponse>(API_ENDPOINTS.analytics.entryExit, {
      siteId: this.siteContext.siteId,
      ...getUtcRangeMillis(),
      pageNumber,
      pageSize,
    });
  }
}
