import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { UserService } from '../../feature/Services/user.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  _userService = inject(UserService);
  _router = inject(Router);
  isLogged: boolean = false;
  items: any[] = [];

  ngOnInit(): void {
    this._userService.user$.subscribe(user => {
      this.isLogged = !!(user && user.email);
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'users', icon: 'pi pi-users', routerLink: '/users' },
      { label: 'Associates', icon: 'pi pi-users', routerLink: '/associates' },
    ];

    if (!this.isLogged) {
      this.items = []
      this.items.push(
        { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' },
        { label: 'Register', icon: 'pi pi-user-plus', routerLink: '/register' }
      );
    } else {
      this.items.push(
        { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
      );
    }
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['login']);
  }
}
