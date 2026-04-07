import { Injectable, NgZone } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private ngZone: NgZone) {}

  request(query: string, variables: any = {}): Promise<any> {
    const token = localStorage.getItem('token');

    return new Promise((resolve, reject) => {
      axios.post(
        environment.graphqlUrl,
        {
          query,
          variables
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
          },
          timeout: 10000
        }
      )
      .then((response) => {
        this.ngZone.run(() => resolve(response.data));
      })
      .catch((error) => {
        console.error('GraphQL Error:', error);
        this.ngZone.run(() => reject(error));
      });
    });
  }
}