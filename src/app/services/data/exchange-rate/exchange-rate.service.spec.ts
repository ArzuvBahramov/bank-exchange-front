import { TestBed } from '@angular/core/testing';

import { ExchangeRateService } from './exchange-rate.service';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ExchangeRate} from "../../../model/exchange-rate.model";
import {environment} from "../../../../envirement/envirement";

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let apiUrl: string = `${environment.apiUrl}${environment.prefix}/exchanger`;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExchangeRateService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ExchangeRateService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve exchange rates', () => {
    const mockRates: Set<ExchangeRate> = new Set([
      { id: 1, code: 'USD', name: 'USD', rate: 1.0, rateDate: Date.now().toString() },
      { id: 2, code: 'EUR', name: 'EUR', rate: 0.85, rateDate: Date.now().toString() }
    ]);

    service.getExchangers().subscribe((rates) => {
      expect(rates).toEqual(mockRates);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockRates);
  });

  it('should handle HTTP errors', () => {
    const errorMessage = 'Server error';
    service.getExchangers().subscribe(
        () => fail('Expected an error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.error.message).toBe(errorMessage);
        }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush(new ErrorEvent('Network error', { message: errorMessage }));
  });

});
