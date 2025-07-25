import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { User } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  usersList : User[] = [];
  constructor(private authService: AuthService){
    this.getAllUsers();
    console.log(this.authService.isLoggedIn())
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
