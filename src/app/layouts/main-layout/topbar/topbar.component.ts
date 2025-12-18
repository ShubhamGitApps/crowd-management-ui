import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { AlertsDrawerComponent } from '../../../shared/components/alerts-drawer/alerts-drawer.component';
import { SocketService } from '../../../core/socket/socket.service';
import { SiteContextService } from '../../../core/sites/site-context.service';
import { Site } from '../../../core/sites/sites.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [CommonModule, AlertsDrawerComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  alertsOpen = signal(false);
  sites = signal<Site[]>([]);
  dropdownOpen = signal(false);

  alerts = computed(() => this.socketService.alerts());
  activeSite = computed(() => this.siteContext.activeSite());

  constructor(
    private socketService: SocketService,
    private siteContext: SiteContextService
  ) {}

  ngOnInit() {
    // ensure site context is initialized
    this.siteContext.init();

    // load all sites once
    this.siteContext['sitesService'].getAllSites().subscribe({
      next: (sites) => this.sites.set(sites),
      error: (err) => console.error('Failed to load sites', err),
    });
  }

  toggleAlerts() {
    this.alertsOpen.update((v) => !v);
  }

  toggleDropdown() {
    this.dropdownOpen.update((v) => !v);
  }

  selectSite(site: Site) {
    this.siteContext.activeSite.set(site);
    this.dropdownOpen.set(false);
  }
}
