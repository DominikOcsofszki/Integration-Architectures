import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { BonusComputationSheet } from '../models/BonusComputationSheet';
import { Role } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UpdateSheetsService {
    private http = inject(HttpClient)

    //TODO Marek: Api + check if boddy correct or how to put it into the post, also the link to it

    updateSheetAsCeo(yearOfEvaluation: number, salesmanId: number, bonusComputationSheet: BonusComputationSheet): Observable<HttpResponse<[]>> {
        const body = bonusComputationSheet //TODO to json?
        return this.http.post<[]>(
            environment.apiEndpoint + `/api/ceo/pending/sheet/xxx/${salesmanId}/${yearOfEvaluation}`,
            body, { observe: 'response', withCredentials: true }
        );
    }

    updateSheetAsHr(yearOfEvaluation: number, salesmanId: number, bonusComputationSheet: BonusComputationSheet): Observable<HttpResponse<[]>> {
        const body = bonusComputationSheet //TODO to json?
        return this.http.post<[]>(
            environment.apiEndpoint + `/api/hr/pending/sheet/xxx/${salesmanId}/${yearOfEvaluation}`,
            body, { observe: 'response', withCredentials: true }
        );
    }


}
