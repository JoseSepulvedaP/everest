import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CaptchaService } from '../../services/captcha.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  public door: string;
  public id: string;
  public key: any;
  public rotate: number;
  public captcha: Array<Number>;
  public captchaCheck: Array<Number>;
  public loading: boolean;
  public loadingInit: boolean;
  public valid: boolean = false;
  public instruction: string;
  public instructionKey: string;

  constructor(
    private _captchaService: CaptchaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.rotate = 0;
    this.instruction = 'Descifre los sellos';
    this.instructionKey = 'Sello a descifrar';
    this.captchaCheck = [ 0, 0, 0, 0];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.door = params.door);
    this.getCaptcha(this.door);
  }

  getCaptcha(door: string) {
    this.loadingInit = true;
    this._captchaService.getCaptcha(door)
      .subscribe((resp: any) => {
        const { id, captcha } = resp;
        this.captcha = captcha;
        this.id = id;
        this.loadingInit = false;
      }, (err: any) => {
        if (err) {
          Swal.fire({
            icon: 'info',
            title: 'Seleccionar puerta',
            text: 'Selecciona una puerta para ver su maravilloso contenido'
          });
          this.router.navigate(['/']);
        }
    });
  }

  checkPosition(value, index) {
    this.valid = false;
    this._captchaService.removeStorage('valid');
    this.captchaCheck[index] = value;
    if (this.arrayEquals(this.captchaCheck, this.captcha))
      this.validateCaptcha(this.id, this.captchaCheck);
  }

  validateCaptcha(id, captcha) {
    this.loading = true;
    this._captchaService.validate(id, captcha)
      .subscribe((resp: any) => {
        this.valid = resp;
        this._captchaService.recordStorage(this.valid, this.door);
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
    });
  }

  openContent() {
    this.router.navigate([`/puerta/${this.door}/contenido`]);
  }

  arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
  }

}
