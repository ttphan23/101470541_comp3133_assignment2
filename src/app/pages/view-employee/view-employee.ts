import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './view-employee.html',
  styleUrl: './view-employee.css'
})
export class ViewEmployeeComponent implements OnInit {
  employee: any = null;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(id);
    }
  }

  async loadEmployee(id: string): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      const result = await this.employeeService.getEmployeeById(id);

      if (result?.errors) {
        this.errorMessage = result.errors[0]?.message || 'Failed to load employee details.';
        return;
      }

      if (result?.data?.searchEmployeeByEid?.success) {
        this.employee = result.data.searchEmployeeByEid.employee;
      } else {
        this.errorMessage =
          result?.data?.searchEmployeeByEid?.message || 'Employee not found.';
      }
    } catch (error) {
      this.errorMessage = 'Failed to load employee details.';
    } finally {
      this.loading = false;
    }
  }
}