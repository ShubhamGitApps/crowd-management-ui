import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { DashboardFacade } from './dashboard.facade';
import { BaseChartComponent } from '../../../shared/components/charts/base-chart/base-chart.component';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  standalone: true,
  selector: 'app-overview',
  imports: [CommonModule, BaseChartComponent],
  providers: [DashboardFacade],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  constructor(public facade: DashboardFacade) {}

  malePercent = computed(() => this.facade.demographicsPie()[0]?.value ?? 0);
  femalePercent = computed(() => this.facade.demographicsPie()[1]?.value ?? 0);

  occupancyChartOptions = computed<EChartsOption>(() => {
    const series = this.facade.occupancySeries();
    const lastTime = series.length > 0 ? series[series.length - 1].time : null;

    return {
      title: {
        text: 'Overall Occupancy',
        left: 0,
        top: 0,
        textStyle: {
          fontFamily: 'IBM Plex Sans',
          fontSize: 16,
          fontWeight: 500,
          color: '#1D1D1B',
        },
      },

      legend: {
        right: 0,
        data: ['Occupancy'],
        top: 2,
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
          color: 'rgba(13,13,13,0.63)',
          fontFamily: 'IBM Plex Sans',
          fontSize: 14,
        },
      },

      grid: {
        left: 40,
        right: 20,
        top: 40,
        bottom: 40,
      },

      tooltip: {
        trigger: 'axis',
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: series.map((d) => d.time),
        axisLabel: {
          color: '#6B7280',
        },
        name: 'Time',
        nameLocation: 'middle',
        nameGap: 30,
      },

      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#6B7280',
        },
        name: 'Count',
        nameLocation: 'middle',
        nameGap: 50,
      },

      series: [
        {
          name: 'Occupancy',
          type: 'line',
          smooth: true,
          symbol: 'none',

          lineStyle: {
            color: '#009490',
            width: 2,
          },

          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0,148,144,0.25)' },
              { offset: 1, color: 'rgba(0,148,144,0.05)' },
            ]),
          },
          data: series.map((d) => d.value),

          markLine: lastTime
            ? {
                symbol: 'none',
                label: { show: false },
                lineStyle: {
                  type: 'dashed',
                  color: '#B42018',
                  width: 2,
                },
                data: [{ xAxis: lastTime }],
              }
            : undefined,
        },
      ],
      graphic: [
        {
          type: 'line',
          right: 48,
          top: 80,
          bottom: 48,
          shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          style: {
            stroke: '#B42018',
            lineWidth: 2,
            lineDash: [6, 4],
          },
          scaleY: 180,
        },

        {
          type: 'group',
          right: 10,
          top: 30,
          rotation: Math.PI / 2,
          origin: [0, 0],
          children: [
            {
              type: 'rect',
              shape: {
                width: 40,
                height: 20,
                r: 6,
              },
              style: {
                fill: '#B42018',
              },
            },
            {
              type: 'text',
              style: {
                text: 'LIVE',
                fill: '#FFFFFF',
                fontSize: 10,
                fontWeight: 700,
                align: 'center',
                verticalAlign: 'middle',
              },
              left: 10,
              top: 5,
            },
          ],
        },
      ],
    };
  });

  demographicsDonutOptions = computed<EChartsOption>(() => {
    const data = this.facade.demographicsPie();

    const male = data.find((d) => d.name === 'Male')?.value ?? 0;
    const female = data.find((d) => d.name === 'Female')?.value ?? 0;

    return {
      tooltip: { show: false },

      series: [
        {
          type: 'pie',
          radius: ['70%', '88%'],
          center: ['50%', '50%'],
          padAngle: 3,
          itemStyle: {
            borderRadius: 8,
          },
          label: { show: false },
          labelLine: { show: false },

          data: [
            {
              value: female,
              name: 'Female',
              itemStyle: {
                color: 'rgba(71, 178, 176, 0.4)',
              },
            },
            {
              value: male,
              name: 'Male',
              itemStyle: {
                color: 'rgba(42, 127, 125, 0.6)',
              },
            },
          ],
        },
      ],

      graphic: [
        {
          type: 'group',
          left: 'center',
          top: 'center',
          children: [
            {
              type: 'text',
              top: -10,
              style: {
                text: 'Total Crowd',
                fill: '#384250',
                fontSize: 12,
                fontWeight: 400,
                align: 'center',
              },
            },
            {
              type: 'text',
              top: 8,
              style: {
                text: '100%',
                fill: '#030303',
                fontSize: 22,
                fontWeight: 600,
                align: 'center',
              },
            },
          ],
        },
      ],
    };
  });

  demographicsAnalysisOptions = computed<EChartsOption>(() => {
    const trend = this.facade.demographicsTrend();

    return {
      title: {
        text: 'Demographics Analysis',
        left: 0,
        top: 0,
        textStyle: {
          fontFamily: 'IBM Plex Sans',
          fontSize: 16,
          fontWeight: 500,
          color: '#1D1D1B',
        },
      },

      legend: {
        right: 0,
        top: 2,
        data: ['Male', 'Female'],
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
          fontFamily: 'IBM Plex Sans',
          fontSize: 14,
          color: 'rgba(13,13,13,0.63)',
        },
      },

      grid: {
        left: 40,
        right: 20,
        top: 40,
        bottom: 40,
      },

      tooltip: {
        trigger: 'axis',
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: trend.labels,
        axisLabel: {
          color: '#6B7280',
          formatter: (value: string) => {
            const timePart = value.split(' ')[1];
            return timePart ? timePart.slice(0, 5) : value;
          },
        },
        name: 'Time',
        nameLocation: 'middle',
        nameGap: 30,
      },

      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#6B7280',
        },
        name: 'Count',
        nameLocation: 'middle',
        nameGap: 50,
      },

      series: [
        {
          name: 'Male',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: 'rgba(42,127,125,1)',
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(42,127,125,0.35)' },
              { offset: 1, color: 'rgba(42,127,125,0.05)' },
            ]),
          },
          data: trend.male,
        },
        {
          name: 'Female',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: 'rgba(71,178,176,1)',
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(71,178,176,0.30)' },
              { offset: 1, color: 'rgba(71,178,176,0.05)' },
            ]),
          },
          data: trend.female,
        },
      ],
    };
  });
}
