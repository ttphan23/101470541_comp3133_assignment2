import { Component, ChangeDetectorRef } from '@angular/core';
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
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      department: [''],
      designation: ['']
    });
  }

  async onSearch(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.employees = [];
    this.cdr.detectChanges();

    try {
      const { department, designation } = this.searchForm.value;

      const result = await this.employeeService.searchEmployees(
        department || '',
        designation || ''
      );

      console.log('search result:', result);

      if (result?.errors) {
        this.errorMessage = result.errors[0]?.message || 'Search failed.';
      } else if (result?.data?.searchEmployeeByDesignationOrDepartment?.success) {
        this.employees =
          result.data.searchEmployeeByDesignationOrDepartment.employees || [];
      } else {
        this.errorMessage =
          result?.data?.searchEmployeeByDesignationOrDepartment?.message || 'Search failed.';
      }
    } catch (error) {
      console.error('search error:', error);
      this.errorMessage = 'Search failed.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.employees = [];
    this.errorMessage = '';
    this.cdr.detectChanges();
  }
}