import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { BonusViewSalesmanComponent } from './pages/hr/hr-sheet/bonus-view-salesman.component';
import { PendingSheetsComponent } from './pages/hr/pending-sheets/pending-sheets.component';
import { HrStartComponent } from './pages/hr/hr-start/hr-start.component';
import { LogsComponent } from './pages/admin/logs/logs.component';
import { CeoSheetsComponent } from './pages/ceo/ceo-sheets/ceo-sheets.component';
import { SalesmanSheetComponent } from './pages/salesman/salesman-sheet/salesman-sheet.component';
import { SalesmanSheetsComponent } from './pages/salesman/salesman-sheets/salesman-sheets.component';
import { CeoSheetComponent } from './pages/ceo/ceo-sheet/ceo-sheet.component';

export const ROUTING = {
    all: {
        LoginPageComponent: 'login',
        NotFoundPageComponent: '**',
    },
    hr: {
        PendingSheetsComponent: 'hr',
        HrStartComponent: 'hr/start',
        Sheet: 'hr/sheet/:year/:id'
    },

    admin: {
        LogsComponent: 'admin'
    },

    ceo: {
        PendingSheetsComponent: 'ceo',
        Sheet: 'ceo/sheet/:year/:id'
    },

    salesman: {
        PendingSheetsComponent: 'salesman',
        Sheet: 'salesman/sheet/',
        // Dashboard: 'salesman/dashboard/',
    }
}
const routes: Routes = [
    // { path: 'test', component: DashComponent, canActivate: [AuthGuardService] },
    { path: '', component: LoginPageComponent },
    { path: ROUTING.all.LoginPageComponent, component: LoginPageComponent },
    { path: "testing", component: CeoSheetComponent },
    { path: ROUTING.admin.LogsComponent, component: LogsComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.ceo.PendingSheetsComponent, component: CeoSheetsComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.hr.PendingSheetsComponent, component: PendingSheetsComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.salesman.PendingSheetsComponent, component: SalesmanSheetsComponent, canActivate: [AuthGuardService] },
    //
    { path: ROUTING.hr.Sheet, component: BonusViewSalesmanComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.ceo.Sheet, component: CeoSheetComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.salesman.Sheet + ":year/:id", component: SalesmanSheetComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.hr.HrStartComponent, component: HrStartComponent, canActivate: [AuthGuardService] },

    { path: ROUTING.all.NotFoundPageComponent, component: NotFoundPageComponent, canActivate: [AuthGuardService] },
    // these entries are matched from top to bottom => not found should be the last entry
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }
