import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../envirement/envirement";

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private apiUrl = environment.apiUrl + '/conversion';

  constructor(private http: HttpClient) { }

  convert(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/convert`, request);
  }

  getHistoryConversions(id: number, pageable: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/${id}`, { params: pageable });
  }
}

