import { AngularFireList } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ROUTES, RoutingModule } from './routing/routing.module';
import { LayoutModule } from './layout/layout.module';
import { UIModule } from './ui/ui.module';
import { PagesModule } from './pages/pages.module';
import { pageDataReducer } from './store/reducers/page-data.reducer';
import { appSettingsReducer } from './store/reducers/app-settings.reducer';
import { patientsReducer } from './store/reducers/patients.reducer';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFirestore,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({
      pageData: pageDataReducer,
      appSettings: appSettingsReducer,
      patients: patientsReducer
    }),

    RoutingModule,
    LayoutModule,
    UIModule,
    PagesModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})

export class AppModule { }
