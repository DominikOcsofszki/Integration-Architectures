import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Salesman } from '../models/Salesman';

@Injectable({
    providedIn: 'root'
})
export class PendingSalesmanService {

    constructor(private http: HttpClient) { }

    getPendingSalesman(): Observable<HttpResponse<Salesman[]>> {
        return this.http.get<Salesman[]>(
            environment.apiEndpoint + '/api/hr/sheets/pending',
            { observe: 'response', withCredentials: true });
    }

    getNotPendingSalesman(): Observable<HttpResponse<Salesman[]>> {
        return this.http.get<Salesman[]>(
            environment.apiEndpoint + '/api/hr/sheets/notpending',
            { observe: 'response', withCredentials: true });
    }

}
