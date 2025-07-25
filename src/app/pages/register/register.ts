import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService){
  }

  register(email: string,password: string){
    this.authService.register(email,password).subscribe(
      response => {
        Swal.fire({icon:'success', title: 'Usuario registrado', text: response.detail})
      },
      err => {
        Swal.fire({icon:'error', title:'Error al intentar registrar el usuario',text:err.error.detail});
      }
    )
  }
}
