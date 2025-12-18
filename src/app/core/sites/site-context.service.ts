import { Injectable, signal } from '@angular/core';
import { SitesService, Site } from './sites.service';

@Injectable({ providedIn: 'root' })
export class SiteContextService {
  activeSite = signal<Site | null>(null);

  constructor(private sitesService: SitesService) {}

  init() {
    if (this.activeSite()) return;

    this.sitesService.getAllSites().subscribe({
      next: (sites) => {
        if (!sites.length) {
          throw new Error('No sites returned from API');
        }
        this.activeSite.set(sites[0]);
      },
      error: (err) => {
        console.error('Failed to load sites', err);
      },
    });
  }

  get siteId(): string {
    const site = this.activeSite();
    if (!site) {
      throw new Error('Active site not initialized');
    }
    return site.siteId;
  }
}
