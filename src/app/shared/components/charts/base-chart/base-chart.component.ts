import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  standalone: true,
  selector: 'app-base-chart',
  imports: [],
  templateUrl: './base-chart.component.html',
  styleUrl: './base-chart.component.css',
})
export class BaseChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('chartContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;

  @Input() options!: echarts.EChartsOption;

  private chart!: echarts.ECharts;
  private resizeObserver!: ResizeObserver;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Wait for layout to stabilize
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.initChart();
      });
    });
  }

  private initChart() {
    const el = this.container.nativeElement;

    if (!el.clientWidth || !el.clientHeight) {
      console.warn('Chart container has zero size');
      return;
    }

    this.chart = echarts.init(el);
    this.chart.setOption(this.options);

    // Auto resize when layout changes (sidebar collapse, window resize)
    this.resizeObserver = new ResizeObserver(() => {
      this.chart.resize();
    });

    this.resizeObserver.observe(el);
  }

  ngOnChanges() {
    if (this.chart && this.options) {
      this.chart.setOption(this.options, true);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.chart?.dispose();
  }
}
