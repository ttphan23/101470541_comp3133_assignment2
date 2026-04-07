import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [1000, [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: ['']
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    try {
      const payload = {
        ...this.employeeForm.value,
        salary: Number(this.employeeForm.value.salary)
      };

      const result = await this.employeeService.addEmployee(payload);

      if (result?.errors) {
        this.errorMessage = result.errors[0]?.message || 'Failed to add employee.';
        return;
      }

      if (result?.data?.addEmployee?.success) {
        this.successMessage =
          result.data.addEmployee.message || 'Employee added successfully.';
        setTimeout(() => this.router.navigate(['/employees']), 1200);
      } else {
        this.errorMessage =
          result?.data?.addEmployee?.message || 'Failed to add employee.';
      }
    } catch (error) {
      this.errorMessage = 'Failed to add employee.';
    } finally {
      this.loading = false;
    }
  }
}