import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiAuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    user: User;

    constructor(public router: Router
        , public auth: ApiAuthService) {
    }

    ngOnInit() {
        this.user = new User();
    }

    login(event) {
        event.preventDefault();
        this.auth.authenticate(this.user).subscribe(
            res => {
                // console.log(res);
                if (res['status']) {
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem("user", JSON.stringify(res['adminCredentials']));
                    // console.log(JSON.parse(localStorage.getItem('user')));
                    this.router.navigate(['/dashboard']);
                } else {
                    alert("Login Failed!!!");
                    return;
                }
            });
    }
}
