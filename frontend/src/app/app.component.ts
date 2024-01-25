import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { NgIf } from '@angular/common';
import { Role } from './models/User';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgIf, MenuBarComponent, RouterOutlet]
})

export class AppComponent implements OnInit {

    private authService = inject(AuthService)
    private userService = inject(UserService)
    isLoggedIn: boolean;
    currentLoggedInUserRole: Role;


    ngOnInit(): void {
        this.authService.subscribeLoginChange((newState: boolean): void => { this.isLoggedIn = newState; });
        this.authService.isLoggedIn().subscribe();
        this.userService.getOwnUser().subscribe(
            user => this.currentLoggedInUserRole=user.role
        );
    }
}
