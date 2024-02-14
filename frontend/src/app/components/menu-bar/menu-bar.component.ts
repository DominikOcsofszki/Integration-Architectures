import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ROUTING } from '../../app.routing';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { environment } from 'environments/environment';
import { Role } from '../../models/User';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, NgFor, MatButtonModule, RouterLinkActive, RouterLink, NgIf]
})
export class MenuBarComponent implements OnInit {

    user: User;
    buttons: any;
    loggedInRole: Role
    /*
    This array holds the definition of the menu's buttons.
   */
    buttons_hr = [
        { title: 'HR-Sheets', routerLink: ROUTING.hr.PendingSheetsComponent },
        { title: 'HR-Start', routerLink: ROUTING.hr.HrStartComponent },
    ];

    buttons_admin = [
        { title: 'admin-logs', routerLink: ROUTING.admin.LogsComponent },
    ];
    buttons_ceo = [
        { title: 'CEO-Sheets', routerLink: ROUTING.ceo.PendingSheetsComponent },
    ];
    buttons_salesman = [
        { title: 'salesman-Sheets', routerLink: ROUTING.salesman.PendingSheetsComponent },
    ];

    /**
     * The following parameters specify objects, which will be provided by dependency injection
     *
     * @param authService
     * @param router
     * @param userService
     */
    constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

    setUpNavbar() {
        if (this.loggedInRole === "hr") this.buttons = this.buttons_hr;
        if (this.loggedInRole === "ceo") this.buttons = this.buttons_ceo;
        if (this.loggedInRole === "salesman") this.buttons = this.buttons_salesman;
        if (this.loggedInRole === "admin") this.buttons = this.buttons_admin;
    }

    async ngOnInit() {
            this.getRoleLoggedIn().then((res) => {
                this.user = res.data;
                this.loggedInRole = this.user.role
                this.setUpNavbar()
            });
    }
    /**
        * function which handles clicking the logout button
    */
    handleLogout(): void {
        this.authService.logout().subscribe();
        void this.router.navigate(['login']);
    }

    /**
        * fetches information about logged-in user
    */
    fetchUser(): void {
        this.userService.getOwnUser().subscribe((user): void => {
            this.user = user;
        });
    }


    async getRoleLoggedIn(): Promise<AxiosResponse> {
        return await axios.get(
            environment.apiEndpoint + `/api/user`,
            { withCredentials: true }
        );
    }

}
