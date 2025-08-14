import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { AuthService } from '../../services/auth/auth-service';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let authServiceSpy : jasmine.SpyObj<AuthService>;

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
});
