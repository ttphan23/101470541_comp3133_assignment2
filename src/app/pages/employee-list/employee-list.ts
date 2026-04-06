import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  async loadEmployees(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const result = await this.employeeService.getAllEmployees();
      this.employees = result?.data?.getAllEmployees?.employees || [];
    } catch (error) {
      this.errorMessage = 'Failed to load employees.';
    } finally {
      this.loading = false;
    }
  }

  async deleteEmployee(id: string): Promise<void> {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmed) return;

    this.errorMessage = '';
    this.successMessage = '';

    try {
      const result = await this.employeeService.deleteEmployeeByEid(id);

      if (result?.errors) {
        this.errorMessage = result.errors[0]?.message || 'Delete failed.';
        return;
      }

      if (result?.data?.deleteEmployeeByEid?.success) {
        this.successMessage =
          result.data.deleteEmployeeByEid.message || 'Employee deleted successfully.';
        await this.loadEmployees();
      } else {
        this.errorMessage =
          result?.data?.deleteEmployeeByEid?.message || 'Delete failed.';
      }
    } catch (error) {
      this.errorMessage = 'Failed to delete employee.';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}