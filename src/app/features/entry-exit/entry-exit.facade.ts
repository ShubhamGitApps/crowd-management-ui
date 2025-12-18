import { Injectable, signal, effect, computed } from '@angular/core';
import { EntryExitService } from '../../core/entry-exit/entry-exit.service';
import { EntryExitRecord } from '../../core/entry-exit/entry-exit.models';
import { SiteContextService } from '../../core/sites/site-context.service';

@Injectable()
export class EntryExitFacade {
  loading = signal(false);

  records = signal<EntryExitRecord[]>([]);
  pageNumber = signal(1);
  pageSize = 50;

  totalPages = signal(0);
  totalRecords = signal(0);

  constructor(
    private service: EntryExitService,
    private siteContext: SiteContextService
  ) {
    effect(() => {
      const site = this.siteContext.activeSite();
      if (!site) return;

      this.load();
    });
  }

  private formatTime(value: string | null): string {
    if (!value) return '--';

    const timePart = value.split(' ')[1];

    const [hourStr, minute] = timePart.split(':');
    let hour = Number(hourStr);

    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;
  }

  load() {
    this.loading.set(true);

    this.service.getEntryExit(this.pageNumber(), this.pageSize).subscribe({
      next: (res) => {
        const formatted = res.records.map((r) => ({
          ...r,
          entryLocal: this.formatTime(r.entryLocal),
          exitLocal: this.formatTime(r.exitLocal),
        }));

        this.records.set(formatted);
        this.totalPages.set(res.totalPages);
        this.totalRecords.set(res.totalRecords);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  /** PAGINATION */
  pages = computed(() => {
    const total = this.totalPages();
    const current = this.pageNumber();

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = new Set<number>();
    pages.add(1);
    pages.add(total);

    if (current > 1) pages.add(current - 1);
    pages.add(current);
    if (current < total) pages.add(current + 1);

    return Array.from(pages).sort((a, b) => a - b);
  });

  goToPage(p: number) {
    if (p < 1 || p > this.totalPages()) return;
    this.pageNumber.set(p);
  }

  nextPage() {
    if (this.pageNumber() < this.totalPages()) {
      this.pageNumber.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.pageNumber() > 1) {
      this.pageNumber.update((p) => p - 1);
    }
  }
}
