import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../interfaces/course';
import { User } from '../interfaces/user';
import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  public users: User[] = [];
  public courses: Course[] = [];
  public editUser!: User;
  public deleteUser!: User;
  public form: FormGroup;

  constructor(private userService: UserService, private courseService: CourseService, fb: FormBuilder,
    private router: Router ) { 
    this.form = fb.group({
      selectedCourses:  new FormArray([])
     });
  }
  
  ngOnInit(): void {
    this.getUsers();
    this.getCourses();
  }

  public getUsers():void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }

  public getCourses():void {
    this.courseService.getCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }

  public onAddStudent(addForm: NgForm): void {
    const closeModal = document.getElementById('add-user-form');
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        closeModal?.click();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }

    );
  }

  public onAddCourse(addFormCourse: NgForm): void {
    const closeModal = document.getElementById('add-course-form');
    this.courseService.addCourse(addFormCourse.value).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourses();
        closeModal?.click();
        addFormCourse.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addFormCourse.reset();
      }

    );
  }

  public onUpdateStudent(user: User): void {
    user.courses = this.form.value.selectedCourses;
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteStudent(userId: number | undefined): void {
    if (userId !== undefined) {
      this.userService.deleteUser(userId).subscribe(
        (response: void) => {
          console.log(response);
          this.getUsers();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public searchStudent(key: string): void {
    const result: User[] = [];
    for (const student of this.users) {
      if(student.id === +key
      || student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || student.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        result.push(student);
      }
    }
    this.users = result;
    if (result.length === 0 || !key) {
      this.getUsers();
    }
  }

  public openStudentModal(user: User | null, mode: string):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add' ) {
      button.setAttribute('data-target', '#addStudentModal');
    }

    if (mode === 'edit' ) {
      if (user !== null) {
        this.editUser = user;
      }
      button.setAttribute('data-target', '#updateStudentModal');
    }

    if (mode === 'delete' ) {
      if (user !== null) {
        this.deleteUser = user;
      }
      button.setAttribute('data-target', '#deleteStudentModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public openCourseModal(course: Course | null, mode: string):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add' ) {
      button.setAttribute('data-target', '#addCourseModal');
    }

    container?.appendChild(button);
    button.click();
  }

  onCheckboxChange(event: any) {
    const selectedCourses = (this.form.controls.selectedCourses as FormArray);
    if (event.target.checked) {
      selectedCourses.push(new FormControl(event.target.value));
    } else {
      const index = selectedCourses.controls
      .findIndex(x => x.value === event.target.value);
      selectedCourses.removeAt(index);
    }
  }

  submit() {
    console.log(this.form.value);
  }

  goToStudentView(user: User) {
    this.router.navigate(['/student/'+user.id], {state: {data: {user: user, courses:this.courses}}});
  }
}
