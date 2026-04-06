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
          success
          message
          employees {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      }
    `;
    return this.graphqlService.request(query);
  }

  getEmployeeById(eid: string) {
    const query = `
      query SearchEmployeeByEid($eid: ID!) {
        searchEmployeeByEid(eid: $eid) {
          success
          message
          employee {
            _id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
          }
        }
      }
    `;
    return this.graphqlService.request(query, { eid });
  }

  addEmployee(employee: any) {
    const mutation = `
      mutation AddEmployee($input: JSON!) {
        addEmployee(input: $input) {
          success
          message
          employee {
            _id
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
      }
    `;
    return this.graphqlService.request(mutation, { input: employee });
  }

  updateEmployeeByEid(eid: string, employee: any) {
    const mutation = `
      mutation UpdateEmployeeByEid($eid: ID!, $input: JSON!) {
        updateEmployeeByEid(eid: $eid, input: $input) {
          success
          message
          employee {
            _id
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
      }
    `;
    return this.graphqlService.request(mutation, { eid, input: employee });
  }

  deleteEmployeeByEid(eid: string) {
    const mutation = `
      mutation DeleteEmployeeByEid($eid: ID!) {
        deleteEmployeeByEid(eid: $eid) {
          success
          message
          deletedId
        }
      }
    `;
    return this.graphqlService.request(mutation, { eid });
  }

  searchEmployees(department?: string, designation?: string) {
    const query = `
      query SearchEmployeeByDesignationOrDepartment($input: JSON!) {
        searchEmployeeByDesignationOrDepartment(input: $input) {
          success
          message
          employees {
            _id
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
      }
    `;

    return this.graphqlService.request(query, {
      input: {
        department: department || '',
        designation: designation || ''
      }
    });
  }
}