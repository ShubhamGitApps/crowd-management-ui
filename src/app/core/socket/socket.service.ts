import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AlertItem } from '../alert/alert.models';
import { LiveOccupancyPayload } from '../dashboard/liveOccupancy.payload';
import { environment } from '../../../environments/environment';

interface RawAlertPayload {
  ts: number;
  eventId: string;
  direction: 'entry' | 'exit';
  personName: string;
  zoneName: string;
  siteName: string;
  severity: 'low' | 'medium' | 'high';
}

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;

  liveOccupancy = signal<LiveOccupancyPayload | null>(null);
  alerts = signal<AlertItem[]>([]);

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(environment.socket.url, {
      path: '/socket.io',
      transports: environment.socket.transports,
      auth: { token },
      forceNew: true,
    });

    this.registerListeners();
  }

  private registerListeners() {
    this.socket.on('live_occupancy', (payload) => {
      this.liveOccupancy.set(payload);
    });

    this.socket.on('alert', (payload: RawAlertPayload) => {
      const d = new Date(payload.ts);

      const alert: AlertItem = {
        id: payload.eventId,
        time: d.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        dateTime: d.toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        title: `${payload.personName} ${payload.direction}`,
        description: `${payload.zoneName} · ${payload.siteName}`,
        severity: payload.severity,
      };

      this.alerts.update((prev) => [alert, ...prev].slice(0, 50));
    });
  }
  private formatDateTime(ts: number): string {
    return new Date(ts).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = undefined as any;
  }
}
