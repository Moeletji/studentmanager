import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enrolment } from '../interfaces/enrolment';

@Injectable({
  providedIn: 'root'
})
export class EnrolmentService {

  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEnrolments(userId: number): Observable<Enrolment[]> {
    return this.http.get<Enrolment[]>(`${this.apiServiceUrl}/enrolment/find/${userId}`);
  }
}
