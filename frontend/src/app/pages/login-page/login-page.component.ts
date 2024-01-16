import {Component} from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { MatCardModule } from '@angular/material/card';

/**
 * This page wraps the login-component
 */
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
    standalone: true,
    imports: [MatCardModule, LoginComponent]
})
export class LoginPageComponent {

    constructor() { }

}
