import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCard, MatCardContent} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/interceptor/auth.interceptor";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ExchangeRateComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        AppRoutingModule,
        MatCardContent,
        MatCard,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatCellDef,
        MatHeaderCellDef,
        MatColumnDef,
        MatHeaderRowDef,
        MatRow,
        MatHeaderRow,
        MatRowDef
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync()
  ]
})
export class AppModule { }
