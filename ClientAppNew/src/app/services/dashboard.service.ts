import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://13.200.35.104:3000/api';

  constructor(private http:HttpClient) { }

  getDashData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/main-dashboard`);
  }

  getPlcStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/plcStatus`);
  }

  getTestBenchRunningCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/testBenchCount`);
  }

  getLast5TestBenchData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getLast5Bench`);
  }

  getObjectCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getObjectCount`);
  }

  
}
