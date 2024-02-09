import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { BonusComputationSheet } from '../models/BonusComputationSheet';

@Injectable({
    providedIn: 'root'
})
export class UpdateSheetsService {
    private http = inject(HttpClient)


    updateSheetAsCeo(bonusComputationSheet: BonusComputationSheet): Observable<HttpResponse<[]>> {
        const body = {
            sheet : bonusComputationSheet
        }
        return this.http.post<[]>(
            environment.apiEndpoint + `/api/ceo/sheet/update/`,
            body,
            { observe: 'response', withCredentials: true }
        );
    }
    updateSheetAsHr(bonusComputationSheet: BonusComputationSheet): Observable<HttpResponse<[]>> {
        const body = {
            sheet : bonusComputationSheet
        }
        return this.http.post<[]>(
            environment.apiEndpoint + `/api/hr/sheet/update/`,
            body,
            { observe: 'response', withCredentials: true }
        );
    }




}
