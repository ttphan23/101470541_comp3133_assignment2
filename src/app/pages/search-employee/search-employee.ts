import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-search-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './search-employee.html',
  styleUrl: './search-employee.css'
})
export class SearchEmployeeComponent {
  searchForm: FormGroup;
  employees: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.searchForm = this.fb.group({
      department: [''],
      designation: ['']
    });
  }

  async onSearch() {
    this.loading = true;
    this.errorMessage = '';
    try {
      const { department, designation } = this.searchForm.value;
      const result = await this.employeeService.searchEmployees(department || null, designation || null);
      this.employees = result?.data?.searchEmployeeByDesignationOrDepartment?.employees || [];
    } catch (error) {
      this.errorMessage = 'Search failed.';
    } finally {
      this.loading = false;
    }
  }

  resetSearch() {
    this.searchForm.reset();
    this.employees = [];
    this.errorMessage = '';
  }
}