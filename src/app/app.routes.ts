import { Routes } from '@angular/router';
import { AssociateListComponent } from './Components/associate-list/associate-list.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'associate', component: AssociateListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
