import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './containers/app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { Store } from 'src/store';
import { AuthModule } from 'src/auth/auth.module';

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { HealthModule } from 'src/health/health.module';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'schedule' }
];
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HealthModule
   
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/