import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  public door: string;
  public valid: boolean = false;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    if (!this.authorization())
      localStorage.clear();
   }

   /**
   * Obtiene captcha
   */
  getCaptcha(door: string): Observable<any> {
    const url = `${environment.urlApi}/captcha/${door.toUpperCase()}`;
    return this.http.get(url)
              .pipe(
                map((resp: any) => {
                  return resp.captcha;
                })
              );
  }

   /**
   * Valida captcha
   */
  validate(id: string, captcha: Array<number>): Observable<boolean> {
    const url = `${environment.urlApi}/validate`;
    return this.http.post(url, { id, captcha })
              .pipe(
                map((resp: any) => {
                  return resp.valid;
                })
              );
  }

  /**
   * Graba en storage
   */
  recordStorage(valid: boolean, door: string) {
    localStorage.setItem('valid', JSON.stringify(valid));
    localStorage.setItem('door', door);
    this.valid = valid;
    this.door = door;
  }

  /**
   * Limpia Storage
   */
  removeStorage(item: any) {
    localStorage.removeItem(`${item}`);
  }

  /**
   * Obtiene item
   */
  getStorage() {
    return localStorage.getItem('door')
  }

  /**
   * Valida en Storage
   */
  validateStorage() {
    return JSON.parse(localStorage.getItem('valid'));
  }

  /**
   * Obtiene storage
   */
  authorization() {
    return this.validateStorage()
  }

}
