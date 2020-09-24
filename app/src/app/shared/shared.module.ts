import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptchaKeyComponent } from './captcha-key/captcha-key.component';


@NgModule({
  declarations: [
    CaptchaKeyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CaptchaKeyComponent
  ]
})
export class SharedModule { }
