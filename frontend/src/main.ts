import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from '../environments/environment';
import { AppComponent } from './app/app.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRouting } from './app/app.routing';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRouting, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule, MatTableModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
    .catch((err): void => console.error(err));
