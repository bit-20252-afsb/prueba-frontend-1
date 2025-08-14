import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { APIResponse } from '../../interfaces/auth.interface';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy : jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockEmail : string;
  let mockPassword: string;
  let mockToken: string;
  beforeAll( ()=> {
    mockEmail = 'mock@email.com';
    mockPassword = 'test-password';
    mockToken = 'test-token';
  });

  beforeEach(async () => {
    const authSpyObj = jasmine.createSpyObj('AuthService',['login','setToken']);
    const routerSpyObj = jasmine.createSpyObj('Router',['navigate']);
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        {provide: AuthService, useValue: authSpyObj},
        {provide: Router, useValue: routerSpyObj}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería ocurrir un error al intentar logearse una la aplicación', ()=>{
    // Arrange
    const mockErrorResponse = {error: {detail: 'Ocurrió un error inesperado'}};
    // Act
    authServiceSpy.login.and.returnValue(throwError(mockErrorResponse));
    component.login(mockEmail,mockPassword);
    // Assert
    expect(Swal.isVisible()).toBeTruthy();
  });
  
  it('Debería logear el usuario y remitirlo a la vista home', ()=>{
    // Arrange
    const mockLoginResponse : APIResponse = {detail: 'Logeo exitoso', jwt: mockToken};
    // Act
    authServiceSpy.login.and.returnValue(of(mockLoginResponse));
    authServiceSpy.setToken.withArgs(mockToken);
    component.login(mockEmail,mockPassword);
    // Assert
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle()?.textContent).toBe('Logeado exitoso');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  })
});
