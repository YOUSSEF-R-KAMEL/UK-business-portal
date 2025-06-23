import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { UserService } from '../../feature/Services/user.service';
import { AuthService } from '../../feature/Services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  _authService = inject(AuthService);
  _router = inject(Router);
  isLogged: boolean = false;
  items: any[] = [];
  isAdmin = false

  ngOnInit(): void {
    this._authService.user$.subscribe(loginData => {
      this.isLogged = !!(loginData && loginData.user?.email);
      this.isAdmin = loginData?.role === 'admin';
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    this.items = [];

    if (this.isLogged) {
      this.items.push(
        { label: 'Home', icon: 'pi pi-home', routerLink: '/', routerLinkActiveOptions: { exact: true } },
        { label: 'Articles', icon: 'pi pi-file', routerLink: '/articles' },
      )
      if (this.isAdmin) {
        this.items.push(
          { label: 'Users', icon: 'pi pi-users', routerLink: '/users' },
          { label: 'Associates', icon: 'pi pi-briefcase', routerLink: '/associates' },
        );
      }
      this.items.push(
        { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
      );
    } else {
      this.items.push(
        { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' },
        { label: 'Register', icon: 'pi pi-user-plus', routerLink: '/register' }
      );
    }
  }
  logout() {
    this._authService.logout();
    this._router.navigate(['login']);
  }
}
