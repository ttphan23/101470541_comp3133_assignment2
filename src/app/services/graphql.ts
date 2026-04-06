import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  async request(query: string, variables: any = {}) {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        environment.graphqlUrl,
        {
          query,
          variables
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('GraphQL Error:', error);
      throw error;
    }
  }
}