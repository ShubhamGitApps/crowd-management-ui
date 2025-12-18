import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { AlertItem } from '../../../core/alert/alert.models';


@Component({
  standalone: true,
  selector: 'app-alerts-drawer',
  imports: [CommonModule],
  templateUrl: './alerts-drawer.component.html',
  styleUrl: './alerts-drawer.component.css'
})
export class AlertsDrawerComponent {
  @Input() open = false;
  @Input() alerts: AlertItem[] = [];

  @Output() close = new EventEmitter<void>();

}
