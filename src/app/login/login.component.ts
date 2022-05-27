import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl!: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        ) { }

    ngOnInit() {
       
    }

    login() {
        this.loading = true;
        window.localStorage.setItem("loginCredentials", JSON.stringify({username: this.model.username, password: this.model.password}));
        const currentUser = window.localStorage.getItem('registeredUser');
        if (currentUser !== null) {
            const user = JSON.parse(currentUser);

            if (user.password === this.model.password && user.username === this.model.username) {
                this.router.navigate(['/home'])
            }else {
                alert("Please enter the correct username/passowrd!");
            }

        }else {
            alert("Please register!");
        }
    }
}
