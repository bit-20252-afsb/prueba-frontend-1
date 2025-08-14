import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { AuthService } from '../../services/auth/auth-service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { APIResponse } from '../../interfaces/auth.interface';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let authServiceSpy : jasmine.SpyObj<AuthService>;
  let mockEmail : string;
  let mockPassword : string;

  beforeAll( () =>{
    mockEmail = 'test@email.com';
    mockPassword = 'test-password';
  })

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService',['register']);
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [{provide: AuthService, useValue: authSpy}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Debería ser capaz de manejar un error inesperado en el llamado de la API', ()=> {
    // Arrange
    const mockErrorResponse = {error: {detail: 'Ocurrió un error inesperado'}};
    // Act
    authServiceSpy.register.and.returnValue(throwError(mockErrorResponse));
    component.register(mockEmail,mockPassword);
    // Assert
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle()?.textContent).toBe('Error al intentar registrar el usuario');
  });

  it('Debería enviar una solicitud de registro satisfactoriamente', ()=> {
    // Arrange
    const mockRegisterResponse: APIResponse = {detail: 'El usuario se registró de manera satisfactoria'};
    // Act
    authServiceSpy.register.and.returnValue(of(mockRegisterResponse));
    component.register(mockEmail,mockPassword);
    // Assert
    expect(authServiceSpy.register).toHaveBeenCalledWith(mockEmail,mockPassword);
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle()?.textContent).toBe('Usuario registrado');
  });


});
