import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router){}

  login(email: string, password: string){
    this.authService.login(email,password).subscribe(
      response =>{
        Swal.fire({icon:'success',title: 'Logeado exitoso'});
        this.authService.setToken(response.jwt!)
        this.router.navigate(['/home'])
      },
      err => {
        Swal.fire({icon: 'error', title: 'Error al intentar logear el usuario', text: err.error.detail})
      }
    )
  }

}
