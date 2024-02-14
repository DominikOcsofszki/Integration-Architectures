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
    private userService = inject(UserService);
    private authService = inject(AuthService);
    private router = inject(Router);

    canActivate(): Observable<boolean> {
        return this.authService.isLoggedIn()
            .pipe(
                map((state): boolean => {
                    if (!state) {
                        void this.router.navigate(['login']);
                    }
                    return state;
                })
            );
    }


    canMatch(checkRole:any): Observable<boolean> {
        return this.userService.getOwnUser().pipe(map(
            (user: User) => user.role === checkRole)
        );
    }

}
