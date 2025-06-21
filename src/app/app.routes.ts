import { Routes } from '@angular/router';
import { authGuard } from './Core/guard/auth.guard';
import { HomeComponent } from './feature/home/home.component';
import { AssociateListComponent } from './feature/associate-list/associate-list.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { UsersComponent } from './feature/users/users.component';
import { ArticleListComponent } from './feature/article-list/article-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'articles', component: ArticleListComponent, canActivate: [authGuard] },
  { path: 'associates', component: AssociateListComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
