import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { BonusViewSalesmanComponent } from './pages/hr/hr-sheet/bonus-view-salesman.component';
import { PendingSheetsComponent } from './pages/hr/pending-sheets/pending-sheets.component';
import { HrStartComponent } from './pages/hr/hr-start/hr-start.component';

export const ROUTING = {
    hr: {
        PendingSheetsComponent: 'hr/pending',
        HrStartComponent: 'hr/start',
        BonusViewSalesmanComponent: '',
    },

    all: {
        LoginPageComponent: 'login',
        NotFoundPageComponent: '**'
    },

    ceo: {

    },

    salesman: {

    }
}
const routes: Routes = [
    { path: ROUTING.all.LoginPageComponent, component: LoginPageComponent },
    { path: ROUTING.hr.PendingSheetsComponent, component: PendingSheetsComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.hr.HrStartComponent, component: HrStartComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.hr.BonusViewSalesmanComponent, component: BonusViewSalesmanComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.all.NotFoundPageComponent, component: NotFoundPageComponent }
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
