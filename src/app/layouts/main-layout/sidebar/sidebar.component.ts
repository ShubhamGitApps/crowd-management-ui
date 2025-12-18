import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  collapsed = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  toggle() {
    this.collapsed.update((v) => !v);
  }

  get toggleLabel() {
    return this.collapsed() ? 'Expand' : 'Collapse';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
