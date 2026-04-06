import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { EmployeeListComponent } from './pages/employee-list/employee-list';
import { AddEmployeeComponent } from './pages/add-employee/add-employee';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee';
import { SearchEmployeeComponent } from './pages/search-employee/search-employee';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/add', component: AddEmployeeComponent, canActivate: [authGuard] },
  { path: 'employees/:id', component: ViewEmployeeComponent, canActivate: [authGuard] },
  { path: 'employees/edit/:id', component: EditEmployeeComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchEmployeeComponent, canActivate: [authGuard] }
];