import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Salesman } from '../models/Salesman';

@Injectable({
    providedIn: 'root',
})
export class HRService {
    constructor(private http: HttpClient) {}

    getPendingSheets(): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            environment.apiEndpoint + '/api/hr/sheets/pending',
            { observe: 'response', withCredentials: true }
        );
    }

    getNotPendingSheets(): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            environment.apiEndpoint + '/api/hr/sheets/notpending',
            { observe: 'response', withCredentials: true }
        );
    }

    startBonusCalculation(year: number): Observable<HttpResponse<[]>>{
        return this.http.post<[]>(
            `${environment.apiEndpoint}/api/hr/sheets/start/${year}`,
            {},
            {observe: 'response', withCredentials: true}
        );
    }
}
