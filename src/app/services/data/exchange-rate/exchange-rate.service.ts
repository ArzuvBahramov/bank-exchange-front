import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExchangeRate} from "../../../model/exchange-rate.model";
import {environment} from "../../../../envirement/envirement";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private apiUrl = `${environment.apiUrl}${environment.prefix}/exchanger`;

  constructor(private http: HttpClient) { }

  getExchangers(): Observable<Set<ExchangeRate>> {
    return this.http.get<Set<ExchangeRate>>(this.apiUrl);
  }
}
