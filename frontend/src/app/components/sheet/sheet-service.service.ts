import { Injectable } from '@angular/core';
import { Salesman } from 'src/app/models/Salesman';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BonusComputationSheet } from 'src/app/models/BonusComputationSheet';
import { UserService } from 'src/app/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class SheetServiceService {

    //TODO refactor for depending on logged in user use admin/hr/ceo/salesman
    constructor(private http: HttpClient, private userService: UserService) { }

    fetchSheetFromSalesmanIdYear(salesmanId: number, yearOfEvaluation: number): Observable<BonusComputationSheet> {
        return this.http.get<BonusComputationSheet>(
            environment.apiEndpoint + `/api/hr/sheet/${salesmanId}/${yearOfEvaluation}`,
            { observe: 'response', withCredentials: true })
            .pipe(map(res => res.body));
    }
    // fetchSalesmanSalesmanID(id: number): Observable<Salesman> { //TODO change to hr, some issue with rights or so not working
    //     return this.http.get<Salesman>(environment.apiEndpoint + `/api/admin/salesman/${id}`,
    //         { observe: 'response', withCredentials: true })
    //         .pipe(map(res => res.body));
    // }
    signSheetFromSalesmanIdAndYear(salesmanId: number, yearOfEvaluation: number): void {
        this.userService.getOwnUser().subscribe(user => {
            console.log(user.role);
            this.http.post(
                environment.apiEndpoint + `/api/${user.role}/pending/sheet/sign/${salesmanId}/${yearOfEvaluation}`,
                { withCredentials: true }).subscribe((res) => console.log(res))
        });
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

