import { Injectable } from '@angular/core';
import { GraphqlService } from './graphql';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private graphqlService: GraphqlService) {}

  getAllEmployees() {
    const query = `
      query GetAllEmployees {
        getAllEmployees {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `;
    return this.graphqlService.request(query);
  }

  getEmployeeById(id: string) {
    const query = `
      query GetEmployeeById($id: ID!) {
        getEmployeeById(id: $id) {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `;
    return this.graphqlService.request(query, { id });
  }

  addEmployee(employee: any) {
    const mutation = `
      mutation AddEmployee(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $gender: String!,
        $designation: String!,
        $salary: Float!,
        $date_of_joining: String!,
        $department: String!,
        $employee_photo: String
      ) {
        addEmployee(
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo: $employee_photo
        ) {
          id
          first_name
          last_name
        }
      }
    `;
    return this.graphqlService.request(mutation, employee);
  }

  updateEmployee(id: string, employee: any) {
    const mutation = `
      mutation UpdateEmployee(
        $id: ID!,
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $gender: String!,
        $designation: String!,
        $salary: Float!,
        $date_of_joining: String!,
        $department: String!,
        $employee_photo: String
      ) {
        updateEmployee(
          id: $id,
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo: $employee_photo
        ) {
          id
          first_name
          last_name
        }
      }
    `;
    return this.graphqlService.request(mutation, { id, ...employee });
  }

  deleteEmployee(id: string) {
    const mutation = `
      mutation DeleteEmployee($id: ID!) {
        deleteEmployee(id: $id)
      }
    `;
    return this.graphqlService.request(mutation, { id });
  }

  searchEmployees(department?: string, designation?: string) {
    const query = `
      query SearchEmployees($department: String, $designation: String) {
        searchEmployees(department: $department, designation: $designation) {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `;
    return this.graphqlService.request(query, { department, designation });
  }
}