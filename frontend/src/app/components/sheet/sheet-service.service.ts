import { Injectable } from '@angular/core';
import { Salesman } from 'src/app/models/Salesman';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BonusComputationSheet } from 'src/app/models/BonusComputationSheet';

@Injectable({
    providedIn: 'root'
})
export class SheetServiceService {

    constructor(private http: HttpClient) { }

    fetchSheetFromSalesmanIdYear(salesmanId: number, yearOfEvaluation: number): Observable<BonusComputationSheet> {
        return this.http.get<BonusComputationSheet>(
            environment.apiEndpoint + `/api/hr/sheet/${salesmanId}/${yearOfEvaluation}`,
            { observe: 'response', withCredentials: true })
            .pipe(map(res => res.body));
    }
    fetchSalesmanSalesmanID(id: number): Observable<Salesman> { //TODO change to hr, some issue with rights or so not working
        return this.http.get<Salesman>(environment.apiEndpoint + `/api/admin/salesman/${id}`,
            { observe: 'response', withCredentials: true })
            .pipe(map(res => res.body));
    }
    signSheetFromSalesmanIdAndYear(salesmanId: number, yearOfEvaluation: number):void{
        this.http.post(
            environment.apiEndpoint + `/pending/sheet/sign/${salesmanId}/${yearOfEvaluation}`,
            { withCredentials: true })
    }
}


// router.post("/pending/sheet/sign/:salesmanId/:yearOfEvaluation", signSheet);

// router.get("/sheet/:salesmanId/:yearOfEvaluation/", getSheetByIdAndYear);
// router.get("/sheet/:salesmanId/", getSheetsById);
// router.get("/sheet/year/:yearOfEvaluation/", getSheetsByYear);
// router.get("/sheet", getAllSheets);
// router.get("/sheets/pending", readPendingValues);
// router.get("/sheets/notpending", readNotPendingValues);
// router.post("/sheets/start/:year", startBonusCalculation);
//

