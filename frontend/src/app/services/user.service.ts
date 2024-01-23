import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * handles backend communication regarding user accounts
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    // constructor(private http: HttpClient) { }

    /**
     * retrieves userdata of currently authenticated user
     */
    getOwnUser(): Observable<User> {
        // use angular's integrated HTTP-client to make a get request; handle the response as a User object :
        return this.http.get<User>(environment.apiEndpoint + '/api/user', { withCredentials: true });
    }
    // getLoggedInUser(): Observable<HttpResponse<User>> {
    //     return this.http.get<User>(
    //         environment.apiEndpoint + `/api/user`,
    //         { withCredentials: true, observe: 'response'}
    //     );
    // }
}
