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


@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, NgFor, MatButtonModule, RouterLinkActive, RouterLink, NgIf]
})
export class MenuBarComponent implements OnInit {

    user: User;
    buttons : any;
    /*
    This array holds the definition of the menu's buttons.
   */
    buttons_hr = [
        { title: 'HR-Sheets', routerLink: ROUTING.hr.PendingSheetsComponent },
        { title: 'HR-Sheet', routerLink: ROUTING.hr.BonusViewSalesmanComponent }, // Todo change naming
        { title: 'HR-Start', routerLink: ROUTING.hr.HrStartComponent },
    ];

    buttons_admin = [
        { title: 'admin-Sheets', routerLink: ROUTING.hr.PendingSheetsComponent },
        { title: 'admin-Sheet', routerLink: ROUTING.hr.BonusViewSalesmanComponent }, // Todo change naming
        { title: 'admin-Start', routerLink: ROUTING.hr.HrStartComponent },
    ];
    buttons_ceo = [
        { title: 'CEO-Sheets', routerLink: ROUTING.hr.PendingSheetsComponent },
        { title: 'CEO-Sheet', routerLink: ROUTING.hr.BonusViewSalesmanComponent }, // Todo change naming
        { title: 'CEO-Start', routerLink: ROUTING.hr.HrStartComponent },
    ];
// buttons = this.buttons_hr
/**
 * The following parameters specify objects, which will be provided by dependency injection
 *
 * @param authService
 * @param router
 * @param userService
 */
constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

ngOnInit(): void {
    this.fetchUser();
    console.log(this.user);
    // if(this.user.role) { //TODO return correct Role and not the standart user since it is not the one we are using

    this.buttons = this.buttons_ceo
// }

}

/**
 * function which handles clicking the logout button
 */
handleLogout(): void {
    this.authService.logout().subscribe();
    void this.router.navigate(['login']); // after logout go back to the login-page
}

/**
 * fetches information about logged-in user
 */
fetchUser(): void {
    this.userService.getOwnUser().subscribe((user): void => {
        this.user = user;
    });
}
}
