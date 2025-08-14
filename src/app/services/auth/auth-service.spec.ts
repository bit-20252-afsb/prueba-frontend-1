import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIResponse, User } from '../../interfaces/auth.interface';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockToken : string;
  let mockEmail : string;
  let mockPassword : string;
  let mockBodyRequest : User;

  beforeAll( ()=>{
    mockToken = 'test-token';
    mockEmail = 'test@email.com';
    mockPassword = '1234';
    mockBodyRequest= {email: mockEmail, password: mockPassword};
  })

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
    // Act
    service.setToken(mockToken);
    // Assert
    expect(sessionStorage.getItem('token')).toBe(mockToken);
  });

  it('Debería realizar una llamada al path /login, logear el usuario y enviar el JWT', ()=> {
    // Arrange
    const mockLoginResponse : APIResponse = {detail: 'Bienvenido a la aplicación', jwt: mockToken};
    // Act
    service.login(mockEmail,mockPassword).subscribe( (response:APIResponse) => {
      expect(response).toEqual(mockLoginResponse);
    });
    const req = httpMock.expectOne(`${service['baseApiUrl']}/login`);
    req.flush(mockLoginResponse);
    
    // Assert
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBodyRequest);
  });

  it('Debería obtener el token al utilizar el metodo', ()=> {
    // Arrange
    spyOn(sessionStorage, 'getItem').and.callThrough();
    sessionStorage.setItem('token', mockToken);
    // Act
    service.getToken('token')
    // Assert
    expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('Debería retornar un true en isLoggedIn cuando exista un token', ()=>{
    // Arrange
    sessionStorage.setItem('token',mockToken);

    // Act
    const result : boolean = service.isLoggedIn();

    // Assert
    expect(result).toBe(true);
  });

    it('Debería retornar un false en isLoggedIn cuando no exista un token', ()=>{
    // Arrange
    sessionStorage.removeItem('token');

    // Act
    const result : boolean = service.isLoggedIn();

    // Assert
    expect(result).toBe(false);
  });

});
