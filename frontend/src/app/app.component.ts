import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgIf, MenuBarComponent, RouterOutlet]
})
export class AppComponent implements OnInit {

    isLoggedIn: boolean;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.subscribeLoginChange((newState: boolean): void => { this.isLoggedIn = newState; });
        this.authService.isLoggedIn().subscribe();
    }
}
