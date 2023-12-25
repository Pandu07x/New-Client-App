import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestBenchService {
  private apiUrl = 'http://52.21.7.196:3000/api';

  constructor(private http:HttpClient) { }

  getTestBenchData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/testBenchDetails`);
  }

}
