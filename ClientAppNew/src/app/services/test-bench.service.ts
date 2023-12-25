import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestBenchService {
<<<<<<< HEAD
  private apiUrl = 'http://ec2-52-21-7-196.compute-1.amazonaws.com/api';
=======
  private apiUrl = 'http://ec2-52-21-7-196.compute-1.amazonaws.com:3000/api';
>>>>>>> 942a5ebfb614ebb8b3369649a1937f164ac53e21

  constructor(private http:HttpClient) { }

  getTestBenchData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/testBenchDetails`);
  }

}
