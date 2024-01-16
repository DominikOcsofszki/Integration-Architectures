import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { BonusViewSalesmanComponent } from './pages/hr/hr-sheet/bonus-view-salesman.component';
import { PendingSheetsComponent } from './pages/hr/pending-sheets/pending-sheets.component';
import { HrStartComponent } from './pages/hr/hr-start/hr-start.component';
/*
  This array holds the relation of paths and components which angular router should resolve.

  If you want add a new page with a separate path/subdirectory you should register it here.
  It is also possible to read parameters from the path they have to be specified with ':' in the path.

  If a new page should also show up in the menu bar, you need to add it there too.
  Look at: frontend/src/app/components/menu-bar/menu-bar.component.ts
 */
export function echoo() {

    console.log("hi")
}
export const ROUTING = {
    hrRouting: {
        PendingSheetsComponent: 'hr/pending',
        HrStartComponent: 'hr/start',
        BonusViewSalesmanComponent: '',
    },

    allRouting: {
        LoginPageComponent: 'login',
        NotFoundPageComponent: '**'
    },
    ceo: {

    }
}
const routes: Routes = [
    { path: ROUTING.allRouting.LoginPageComponent, component: LoginPageComponent },
    { path: ROUTING.hrRouting.PendingSheetsComponent, component: PendingSheetsComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.hrRouting.HrStartComponent, component: HrStartComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.hrRouting.BonusViewSalesmanComponent, component: BonusViewSalesmanComponent, canActivate: [AuthGuardService] },
    { path: ROUTING.allRouting.NotFoundPageComponent, component: NotFoundPageComponent }
    // these entries are matched from top to bottom => not found should be the last entry
];
// const routes: Routes = [
//     { path: 'login', component: LoginPageComponent },
//     { path: 'hr/pending', component: PendingSheetsComponent, canActivate: [AuthGuardService] },
//     { path: 'hr/start', component: HrStartComponent, canActivate: [AuthGuardService] },
//     { path: '', component: BonusViewSalesmanComponent, canActivate: [AuthGuardService] },
//     { path: '**', component: NotFoundPageComponent }
//     // these entries are matched from top to bottom => not found should be the last entry
// ];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }
