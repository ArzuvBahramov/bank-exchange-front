import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../envirement/envirement";
import {Conversion} from "../../../model/conversion.model";
import {ConversionRequest} from "../../../model/request/conversion.request";
import {ConversionFilterRequest} from "../../../model/request/conversion.filter.request";

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private apiUrl = `${environment.apiUrl}${environment.prefix}/conversion`;

  constructor(private http: HttpClient) { }

  convert(request: ConversionRequest): Observable<Conversion> {
    return this.http.post<Conversion>(`${this.apiUrl}/convert`, request);
  }

  getHistoryConversions(pageable: any,
                        conversion?: ConversionFilterRequest): Observable<any> {
    return this.http.get(`${this.apiUrl}/history?from=${conversion?.from || ''}&to=${conversion?.to || ''}&username=${conversion?.username || ''}&dateRequest=${conversion?.dateRequest || ''}`,
        { params: pageable });
  }
}

