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
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
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
import { ConversionComponent } from './components/conversion/conversion.component';
import { BankComponent } from './components/bank/bank.component';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatPaginator} from "@angular/material/paginator";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ExchangeRateComponent,
    ConversionComponent,
    BankComponent
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
        MatRowDef,
        MatIcon,
        MatToolbar,
        MatPaginator,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatTabGroup,
        MatTab,
        MatDatepickerToggle,
        MatDatepickerInput,
        MatDatepicker,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatSelectModule,
        MatCardSubtitle,
        MatCardTitle,
        MatCardHeader
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
    MatDatepickerModule,
    DatePipe
  ]
})
export class AppModule { }
