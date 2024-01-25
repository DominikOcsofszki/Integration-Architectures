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


    //TODO: Update comment for all entries
    //TODO Update each comment
    //TODO update the ratings
    //TODO something else?
    // "/pending/sheet/comment/:salesmanId/:yearOfEvaluation"

    // export type Comment = {
    //     type: "Order" | "SocialAttribute" | "BonusComputationSheet";
    //     _id?: String;
    //     text: String;
    // };

    extractCommentsFromBonusComputationSheet(bonusComputationSheet: BonusComputationSheet) {
        //TODO
    }

    updateSheetsAsCeo(yearOfEvaluation: number, salesmanId: number, bonusComputationSheet: BonusComputationSheet): Observable<HttpResponse<[]>> {
        const comments = this.extractCommentsFromBonusComputationSheet(bonusComputationSheet);
        //TODO
        const body = comments //TODO to json?
        return this.http.post<[]>(
            environment.apiEndpoint + `/api/ceo/pending/sheet/comment/${salesmanId}/${yearOfEvaluation}`,
            body, { observe: 'response', withCredentials: true }
        );
    }

}
