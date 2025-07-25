import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { authGuardGuard } from './guards/auth-guard-guard';

export const routes: Routes = [
    {
        path: 'home', component: Home, // Crear una redireccion a login en caso de que no se tenga la sesion activa
    },
    {
        path: 'register', component: Register, canActivate: [authGuardGuard],
    },
    {
        path: 'login', component: Login, canActivate: [authGuardGuard]
    }
];
