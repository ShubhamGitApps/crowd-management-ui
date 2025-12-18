import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUtcRangeMillis } from './analytics.utils';
import { SiteContextService } from '../sites/site-context.service';
import {
  DemographicsResponse,
  DwellResponse,
  FootfallResponse,
  OccupancyResponse,
} from './analytics.responses';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  
  constructor(
    private http: HttpClient,
    private siteContext: SiteContextService
  ) {}

  private payload() {
    return {
      siteId: this.siteContext.siteId,
      ...getUtcRangeMillis(),
    };
  }

  getFootfall() {
    return this.http.post<FootfallResponse>(
      API_ENDPOINTS.analytics.footfall,
      this.payload()
    );
  }

  getDwell() {
    return this.http.post<DwellResponse>(
      API_ENDPOINTS.analytics.dwell,
      this.payload()
    );
  }

  getOccupancy() {
    return this.http.post<OccupancyResponse>(
      API_ENDPOINTS.analytics.occupancy,
      this.payload()
    );
  }

  getDemographics() {
    return this.http.post<DemographicsResponse>(
      API_ENDPOINTS.analytics.demographics,
      this.payload()
    );
  }

  getEntryExit(pageNumber = 1, pageSize = 50) {
    return this.http.post(API_ENDPOINTS.analytics.entryExit, {
      ...this.payload(),
      pageNumber,
      pageSize,
    });
  }
}
