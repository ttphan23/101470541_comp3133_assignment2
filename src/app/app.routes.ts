import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './employees/view-employee/view-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { SearchEmployeeComponent } from './employees/search-employee/search-employee.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/add', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employees/:id', component: ViewEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchEmployeeComponent, canActivate: [AuthGuard] }
];