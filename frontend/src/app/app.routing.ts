import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { BonusViewSalesmanComponent } from './pages/hr/hr-sheet/bonus-view-salesman.component';
import { PendingSheetsComponent } from './pages/hr/pending-sheets/pending-sheets.component';
import { HrStartComponent } from './pages/hr/hr-start/hr-start.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { LogsComponent } from './pages/admin/logs/logs.component';

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
        Sheet: 'salesman/sheet/:year/:id',
    }
}
const routes: Routes = [
    { path: ROUTING.all.LoginPageComponent, component: LoginPageComponent },
    { path: ROUTING.admin.LogsComponent, component: LogsComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.ceo.PendingSheetsComponent, component: PendingSheetsComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.hr.PendingSheetsComponent, component: PendingSheetsComponent, canActivate: [AuthGuardService] },
    //
    { path: ROUTING.hr.Sheet , component: BonusViewSalesmanComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.ceo.Sheet , component: BonusViewSalesmanComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.hr.HrStartComponent, component: HrStartComponent, canActivate: [AuthGuardService] },

    { path: ROUTING.all.NotFoundPageComponent, component: NotFoundPageComponent, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
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
