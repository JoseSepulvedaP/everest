import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptchaService } from './captcha.service';
import { AuthenticationGuard } from './authentication.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CaptchaService,
    AuthenticationGuard
  ]
})
export class ServicesModule { }
