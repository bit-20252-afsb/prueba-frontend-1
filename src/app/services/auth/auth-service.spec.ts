import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIResponse, User } from '../../interfaces/auth.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    sessionStorage.clear();
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería realizar la llamada al path /create y registrar un usuario', () => {
    // Arrange
    const mockRegisterResponse : APIResponse = {detail: 'Usuario registrado satisfactoriamente'};
    const mockEmail : string = 'test@email.com';
    const mockPassword : string = '1234';
    const mockBodyRequest : User = {email: mockEmail, password: mockPassword};
    // Act
    service.register(mockEmail,mockPassword).subscribe((response:APIResponse)=>{
      expect(response).toEqual(mockRegisterResponse);
    });
    const req = httpMock.expectOne(`${service['baseApiUrl']}/create`)
    req.flush(mockRegisterResponse);
    // Assert
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBodyRequest);
  });

  it('Debería realizar la llamda al path / y retornar todos los usuarios', ()=>{
    // Arrange
    const mockUserList : User[] = [];
    // Act
    service.getAllUsers().subscribe( (response: User[]) => {
      expect(response).toEqual(mockUserList);
    });
    const req = httpMock.expectOne(`${service['baseApiUrl']}/`);
    req.flush(mockUserList);
    // Assert
    expect(req.request.method).toBe('GET');
  });

  it('Debería guardar el token al usar el método setToken del servicio', ()=>{
    // Arrange
    const mockToken : string = 'test-token';
    // Act
    service.setToken(mockToken);
    // Assert
    expect(sessionStorage.getItem('token')).toBe(mockToken);
  });

});
