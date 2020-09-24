import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ServicesModule } from '../services/services.module';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    HomeComponent,
    CaptchaComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ServicesModule,
    SharedModule,
    YouTubePlayerModule
  ]
})
export class PagesModule { }
