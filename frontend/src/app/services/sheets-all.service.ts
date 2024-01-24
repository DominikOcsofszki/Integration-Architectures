import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Role, User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class SheetsAllService {
    private http = inject(HttpClient);

    getPendingSheetsSalesman(user: User): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            environment.apiEndpoint + `/api/salesman/sheets/pending/${user.salesmanId}`,
            { observe: 'response', withCredentials: true }
        );
    }

    getNotPendingSheetsSalesman(user: User): Observable<HttpResponse<[]>> {
        console.log(user.salesmanId)
        return this.http.get<[]>(
            environment.apiEndpoint + `/api/salesman/sheets/notpending/${user.salesmanId}`,
            { observe: 'response', withCredentials: true }
        );
    }

    getPendingSheets(role: Role): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            environment.apiEndpoint + `/api/${role}/sheets/pending`,
            { observe: 'response', withCredentials: true }
        );
    }

    getNotPendingSheets(role: Role): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            environment.apiEndpoint + `/api/${role}/sheets/notpending`,
            { observe: 'response', withCredentials: true }
        );
    }

    startBonusCalculation(year: number): Observable<HttpResponse<[]>> {
        return this.http.post<[]>(
            `${environment.apiEndpoint}/api/hr/sheets/start/${year}`,
            {},
            { observe: 'response', withCredentials: true }
        );
    }
}
