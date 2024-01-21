import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { BonusComputationSheet } from '../models/BonusComputationSheet';

@Injectable({
    providedIn: 'root'
})
export class SheetServiceService {

    constructor(private http: HttpClient) { }

    getSheetFromIdAndYear(id: number, year: number): Observable<HttpResponse<BonusComputationSheet>> {
        return this.http.get<BonusComputationSheet>(
            environment.apiEndpoint + `/api/hr/sheet/${id}/${year}`,
            { observe: 'response', withCredentials: true }
        );
    }
    // getSalesmanFromSalesmanID(id: number, year: number): Observable<HttpResponse<[]>> {
    //     return this.http.get<[]>(
    //         environment.apiEndpoint + `/api/admin/salesman/${id}`,
    //         { observe: 'response', withCredentials: true }
    //     );
    // }
}

