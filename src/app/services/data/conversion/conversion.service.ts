import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../envirement/envirement";
import {Conversion} from "../../../model/conversion.model";
import {ConversionRequest} from "../../../model/request/conversion.request";

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private apiUrl = `${environment.apiUrl}${environment.prefix}/conversion`;

  constructor(private http: HttpClient) { }

  convert(request: ConversionRequest): Observable<Conversion> {
    return this.http.post<Conversion>(`${this.apiUrl}/convert`, request);
  }

  getHistoryConversions(id: number, pageable: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/${id}`, { params: pageable });
  }
}

