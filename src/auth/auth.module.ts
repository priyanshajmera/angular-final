import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule,Routes} from '@angular/router';
import { AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule } from '@angular/fire/compat/auth';
import {AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SharedModule } from './shared/shared.module';
export const ROUTES:Routes=[
    {
        path:'auth',
        children:[
            {
                path:'',
                pathMatch:'full',
                redirectTo:'login'
                
            },
            {
                path:'login',
                loadChildren: () =>
                    import('./login/login.module').then((m) => m.LoginModule),
            },
            {
                path:'register',
                loadChildren: () =>
                    import('./register/register.module').then((m) => m.RegisterModule),
            }

        ]
    }
];

export const firebaseConfig = {
    apiKey: "AIzaSyBWh9e4W7fE7VT8OPacewFGGOl15HX6GdM",
    authDomain: "angular-final-22ddc.firebaseapp.com",
    databaseURL: "https://angular-final-22ddc-default-rtdb.firebaseio.com",
    projectId: "angular-final-22ddc",
    storageBucket: "angular-final-22ddc.appspot.com",
    messagingSenderId: "380908841852",
    appId: "1:380908841852:web:de4525a95aa5866fd852f9",
    measurementId: "G-YWCHFK2GXB"
  };

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ],
})
export class AuthModule {}