import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../models/User';

/**
 * this service implements the CanActivate interface
 * it enables angular router, to check whether a user is allowed to access a page or not
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {
    // constructor(private authService: AuthService, private router: Router) { }
    private userService = inject(UserService);
    private authService = inject(AuthService);
    private router = inject(Router);

    canActivate(): Observable<boolean> {
        // mapping isLoggedIn():Observable to this function:
        return this.authService.isLoggedIn()
            .pipe(
                map((state): boolean => {
                    if (!state) { // go back to login, if user is not allowed to enter
                        void this.router.navigate(['login']); //TODO removed this and put into ROUTING
                    }
                    return state;
                })
            );
    }

    // canMatch(): Observable<boolean> {
    //     const checkRole = 'hr';
    //     // return checkRole ===
    //     return this.userService.getOwnUser().pipe(map(
    //         (user: User) => user.role === checkRole)
    //     );
    // }

    canMatch(checkRole:any): Observable<boolean> {
        // const checkRole = 'hr';
        // return checkRole ===
        return this.userService.getOwnUser().pipe(map(
            (user: User) => user.role === checkRole)
        );
    }

}
