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
        // private authenticationService: AuthenticationService,
        ) { }

    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
