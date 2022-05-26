import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiServiceUrl}/course/all`);
  }

  public addCourse(user: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiServiceUrl}/course/add`, user);
  }

  public updateCourse(user: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiServiceUrl}/course/update`, user);
  }

  public deleteCourse(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/course/delete/${userId}`);
  }
  
}
