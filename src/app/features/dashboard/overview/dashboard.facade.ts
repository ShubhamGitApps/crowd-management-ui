import { Injectable, signal, effect, computed } from '@angular/core';
import { DashboardService } from '../../../core/dashboard/dashboard.service';
import { SiteContextService } from '../../../core/sites/site-context.service';
import { SocketService } from '../../../core/socket/socket.service';
import {
  OccupancyResponse,
  DemographicsResponse,
} from '../../../core/dashboard/analytics.responses';

@Injectable()
export class DashboardFacade {
  private occupancyRaw = signal<OccupancyResponse | null>(null);
  private demographicsRaw = signal<DemographicsResponse | null>(null);

  loading = signal(true);

  footfall = signal<number | null>(null);
  avgDwellMinutes = signal<number | null>(null);

  liveOccupancy = computed(
    () => this.socket.liveOccupancy()?.siteOccupancy ?? null
  );

  maleLive = computed(
    () => this.socket.liveOccupancy()?.genderCount?.male ?? null
  );

  femaleLive = computed(
    () => this.socket.liveOccupancy()?.genderCount?.female ?? null
  );

  occupancySeries = computed(
    () =>
      this.occupancyRaw()?.buckets.map((b) => ({
        time: b.local.split(' ')[1].slice(0, 5),
        value: Number(b.avg),
      })) ?? []
  );

  demographicsPie = computed(() => {
    const buckets = this.demographicsRaw()?.buckets;
    if (!buckets?.length) return [];

    const last = buckets[buckets.length - 1];

    return [
      { name: 'Male', value: last.male },
      { name: 'Female', value: last.female },
    ];
  });

  demographicsTrend = computed(() => ({
    labels:
      this.demographicsRaw()?.buckets.map((b) =>
        b.local.split(' ')[1].slice(0, 5)
      ) ?? [],
    male: this.demographicsRaw()?.buckets.map((b) => b.male) ?? [],
    female: this.demographicsRaw()?.buckets.map((b) => b.female) ?? [],
  }));

  constructor(
    private dashboardService: DashboardService,
    private siteContext: SiteContextService,
    private socket: SocketService
  ) {
    effect(() => {
      const site = this.siteContext.activeSite();
      if (!site) return;

      this.load();
    });
  }

  private load() {
    this.loading.set(true);

    Promise.all([
      this.dashboardService.getFootfall().toPromise(),
      this.dashboardService.getDwell().toPromise(),
      this.dashboardService.getOccupancy().toPromise(),
      this.dashboardService.getDemographics().toPromise(),
    ])
      .then(([footfall, dwell, occupancy, demographics]) => {
        if (!footfall || !dwell) return;

        this.footfall.set(footfall.footfall);
        this.avgDwellMinutes.set(dwell.avgDwellMinutes);

        this.occupancyRaw.set(occupancy ?? null);
        this.demographicsRaw.set(demographics ?? null);
      })
      .finally(() => this.loading.set(false));
  }
}
