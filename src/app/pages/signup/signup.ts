import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GraphqlService } from '../../services/graphql';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private graphqlService: GraphqlService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const mutation = `
      mutation Signup($input: JSON!) {
        signup(input: $input) {
          success
          message
          token
          user {
            _id
            username
            email
          }
        }
      }
    `;

    const variables = {
      input: {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }
    };

    try {
      const result = await this.graphqlService.request(mutation, variables);

      if (result.errors) {
        this.errorMessage = result.errors[0]?.message || 'Signup failed.';
      } else if (result?.data?.signup?.success) {
        this.successMessage = result.data.signup.message || 'Signup successful. Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.errorMessage = result?.data?.signup?.message || 'Signup failed.';
      }
    } catch (error: any) {
      this.errorMessage = 'Something went wrong. Please try again.';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  get f() {
    return this.signupForm.controls;
  }
}