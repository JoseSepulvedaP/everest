import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CaptchaService } from './captcha.service';
import Swal from 'sweetalert2'

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private _captchaService: CaptchaService,
    public router: Router
  ) {}

  canActivate() {
    if (!this._captchaService.authorization()) {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Restringido!!!',
        text: 'Selecciona una puerta para ver su maravilloso contenido'
      });
      this.router.navigate(['/']);
    }
    return true;
  }
}
