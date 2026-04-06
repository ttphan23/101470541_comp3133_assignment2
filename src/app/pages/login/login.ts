import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GraphqlService } from '../services/graphql';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private graphqlService: GraphqlService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]], // username or email
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const mutation = `
      mutation Login($usernameOrEmail: String!, $password: String!) {
        login(usernameOrEmail: $usernameOrEmail, password: $password) {
          token
          user {
            id
            username
            email
          }
        }
      }
    `;

    const variables = {
      usernameOrEmail: this.loginForm.value.identifier,
      password: this.loginForm.value.password
    };

    try {
      const result = await this.graphqlService.request(mutation, variables);

      if (result.errors) {
        this.errorMessage = result.errors[0]?.message || 'Login failed.';
        return;
      }

      const token = result?.data?.login?.token;

      if (token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/employees']);
      } else {
        this.errorMessage = 'Invalid login response.';
      }
    } catch (error: any) {
      this.errorMessage = 'Something went wrong. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}