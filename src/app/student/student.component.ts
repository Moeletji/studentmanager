import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../interfaces/course';
import { Enrolment } from '../interfaces/enrolment';
import { User } from '../interfaces/user';
import { CourseService } from '../services/course.service';
import { EnrolmentService } from '../services/enrolment.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public user!: User;
  public courses!: Course[];
  public enrolledCourses: Course[] =[];

  constructor(private route: ActivatedRoute, private userService: UserService, private courseService: CourseService,
    private enrolmentService: EnrolmentService) { }

  ngOnInit(): void {
    this.user = history?.state?.data?.user;
    this.courses = history?.state?.data?.courses;
    this.onGetStudentEnrolments(this.user?.id);
  }

  public onGetStudentEnrolments(userId: number): void {
    if (userId) {
      this.enrolmentService.getEnrolments(userId).subscribe(
        (response: Enrolment[]) => {
          console.log(response);
          if (response?.length > 0) {
            response.forEach((enrolment: Enrolment) => {
              const currentCourse = this.courses?.find((course: Course) => course.id === enrolment.courseId);
              if (currentCourse) {
                currentCourse.date = enrolment.date;
                this.enrolledCourses.push(currentCourse);
              }
            })
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }    
  }
}
