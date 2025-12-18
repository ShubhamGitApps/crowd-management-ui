import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { SocketService } from '../socket/socket.service';
import { SiteContextService } from '../sites/site-context.service';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'cms_token';

  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private http: HttpClient,
    private siteContext: SiteContextService,
    private socketService: SocketService
  ) {}

  login(payload: LoginRequest) {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http
      .post<LoginResponse>(
        'https://hiring-dev.internal.kloudspot.com/api/auth/login',
        payload
      )
      .pipe(
        tap({
          next: (res: any) => {
            const token = res.token;
            if (!token) {
              throw new Error('Token missing in login response');
            }

            localStorage.setItem('cms_token', token);

            this.siteContext.init(); // 👈 initialize site
            this.socketService.connect(token);

            this.isLoading.set(false);
          },

          error: () => {
            this.error.set('Invalid email or password');
            this.isLoading.set(false);
          },
        })
      );
  }

  restoreSession() {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return;

    this.siteContext.init();
    this.socketService.connect(token);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.siteContext.activeSite.set(null);
  }
}
