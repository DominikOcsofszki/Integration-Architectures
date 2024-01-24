import { inject, Injectable } from '@angular/core';
// import { Salesman } from 'src/app/models/Salesman';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BonusComputationSheet } from 'src/app/models/BonusComputationSheet';
// import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/User';

@Injectable({
    providedIn: 'root'
})
export class SheetServiceService {
    private http= inject(HttpClient)
    //TODO refactor for depending on logged in user use admin/hr/ceo/salesman
    // constructor(private http: HttpClient, private userService: UserService) { }

    fetchSheetFromSalesmanIdYear(salesmanId: number, yearOfEvaluation: number): Observable<BonusComputationSheet> {
        return this.http.get<BonusComputationSheet>(
            environment.apiEndpoint + `/api/hr/sheet/${salesmanId}/${yearOfEvaluation}`,
            { observe: 'response', withCredentials: true })
            .pipe(map(res => res.body));
    }
    signSheetFromSalesmanIdAndYear(salesmanId: number, yearOfEvaluation: number, userRole: Role): void {
        if (userRole === "salesman") {
            // this.signsheetSalesmanYear(yearOfEvaluation); //TODO change to this after post-api(cookies) fixed
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

    signsheetSalesmanYearAndIdUntilPostFix(yearOfEvaluation: number, salesmanId: number): void {//TODO delete after cookies fixed!
        this.http.post(
            environment.apiEndpoint + `/api/salesman/pending/sheet/sign/${salesmanId}/${yearOfEvaluation}`,
            { withCredentials: true }).subscribe((res) => console.log(res))
    }
}


