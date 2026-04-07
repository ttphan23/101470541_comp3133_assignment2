import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  async loadEmployees(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.detectChanges();

    try {
      const result = await this.employeeService.getAllEmployees();
      console.log('getAllEmployees result:', result);

      if (result?.errors) {
        this.errorMessage = result.errors[0]?.message || 'Failed to load employees.';
        this.employees = [];
      } else if (result?.data?.getAllEmployees?.success) {
        this.employees = result.data.getAllEmployees.employees || [];
      } else {
        this.errorMessage =
          result?.data?.getAllEmployees?.message || 'Failed to load employees.';
        this.employees = [];
      }
    } catch (error) {
      console.error('loadEmployees error:', error);
      this.errorMessage = 'Failed to load employees.';
      this.employees = [];
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async deleteEmployee(id: string): Promise<void> {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmed) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.detectChanges();

    try {
      const result = await this.employeeService.deleteEmployeeByEid(id);

      if (result?.errors) {
        this.errorMessage = result.errors[0]?.message || 'Delete failed.';
      } else if (result?.data?.deleteEmployeeByEid?.success) {
        this.successMessage =
          result.data.deleteEmployeeByEid.message || 'Employee deleted successfully.';
        await this.loadEmployees();
      } else {
        this.errorMessage =
          result?.data?.deleteEmployeeByEid?.message || 'Delete failed.';
      }
    } catch (error) {
      this.errorMessage = 'Failed to delete employee.';
    } finally {
      this.cdr.detectChanges();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}