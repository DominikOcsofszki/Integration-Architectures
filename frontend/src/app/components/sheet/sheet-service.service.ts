import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BonusComputationSheet } from 'src/app/models/BonusComputationSheet';
import { Role } from 'src/app/models/User';

@Injectable({
    providedIn: 'root'
})
export class SheetServiceService {
    private http= inject(HttpClient)

    fetchSheetFromSalesmanIdYear(salesmanId: number, yearOfEvaluation: number): Observable<BonusComputationSheet> {
        return this.http.get<BonusComputationSheet>(
            environment.apiEndpoint + `/api/hr/sheet/${salesmanId}/${yearOfEvaluation}`,
            { observe: 'response', withCredentials: true })
            .pipe(map(res => res.body));
    }
    signSheetFromSalesmanIdAndYear(salesmanId: number, yearOfEvaluation: number, userRole: Role): void {
        if (userRole === "salesman") {
            this.signsheetSalesmanYearAndIdUntilPostFix(yearOfEvaluation, salesmanId);
        } else {
            this.http.post(
                environment.apiEndpoint + `/api/${userRole}/pending/sheet/sign/${salesmanId}/${yearOfEvaluation}`,
                { withCredentials: true }).subscribe((res) => console.log(res))
        }
    }



    signsheetSalesmanYear(yearofevaluation: number): void {
        this.http.post(
            environment.apiEndpoint + `/api/salesman/pending/sheet/sign/${yearofevaluation}`,
            { withcredentials: true }).subscribe((res) => console.log(res))
    }

    signsheetSalesmanYearAndIdUntilPostFix(yearOfEvaluation: number, salesmanId: number): void {
        this.http.post(
            environment.apiEndpoint + `/api/salesman/pending/sheet/sign/${salesmanId}/${yearOfEvaluation}`,
            { withCredentials: true }).subscribe((res) => console.log(res))
    }
}


