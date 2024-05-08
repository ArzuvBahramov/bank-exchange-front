import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthDataService } from './auth-data.service';
import {environment} from "../../../../envirement/envirement";

describe('AuthDataService', () => {
  let service: AuthDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthDataService]
    });
    service = TestBed.inject(AuthDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signIn should make POST request', () => {
    const mockLoginResponse = { jwttoken: 'fake-jwt-token' };
    const loginRequest = { username: 'test', password: '1234' };

    service.signIn(loginRequest).subscribe(response => {
      expect(response.jwttoken).toEqual('fake-jwt-token');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${environment.prefix}/auth/sign-in`);
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });

  it('signUp should make POST request', () => {
    const mockSignUpResponse = { id: 1, username: 'test-user' };
    const registerRequest = {
      firstname: 'testname',
      lastname: 'testlastname',
      username: 'testusername',
      email: 'test@example.com',
      password: '1234' };

    service.signUp(registerRequest).subscribe(response => {
      expect(response.id).toEqual(1);
      expect(response.username).toEqual('test-user');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${environment.prefix}/auth/sign-up`);
    expect(req.request.method).toBe('POST');
    req.flush(mockSignUpResponse);
  });

  it('createRefreshToken should make GET request', () => {
    const mockRefreshTokenResponse = { token: 'new-refresh-token' };

    service.createRefreshToken().subscribe(response => {
      expect(response.token).toEqual('new-refresh-token');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${environment.prefix}/auth/refresh-token`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRefreshTokenResponse);
  });

  it('getDetails should make GET request', () => {
    const mockDetailsResponse = { details: 'some-details' };

    service.getDetails().subscribe(response => {
      expect(response.details).toEqual('some-details');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${environment.prefix}/auth/api/details`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetailsResponse);
  });
});

