import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../config/api-endpoints';

export interface Site {
  siteId: string;
  name: string;
  timezone: string;
  country: string;
  city: string;
  zones: {
    zoneId: string;
    name: string;
    securityLevel: string;
  }[];
}

@Injectable({ providedIn: 'root' })
export class SitesService {
  constructor(private http: HttpClient) {}

  getAllSites() {
    return this.http.get<Site[]>(API_ENDPOINTS.sites.site);
  }
}
