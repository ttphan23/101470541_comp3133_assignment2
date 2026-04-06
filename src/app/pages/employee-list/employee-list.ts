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
  styleUrl: './employee-list.css'
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

  async loadEmployees() {
    this.loading = true;
    this.errorMessage = '';
    try {
      const result = await this.employeeService.getAllEmployees();
      this.employees = result?.data?.getAllEmployees || [];
    } catch (error) {
      this.errorMessage = 'Failed to load employees.';
    } finally {
      this.loading = false;
    }
  }

  async deleteEmployee(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmed) return;

    try {
      const result = await this.employeeService.deleteEmployee(id);
      if (result.errors) {
        this.errorMessage = result.errors[0]?.message || 'Delete failed.';
        return;
      }
      this.successMessage = 'Employee deleted successfully.';
      await this.loadEmployees();
    } catch (error) {
      this.errorMessage = 'Delete failed.';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}