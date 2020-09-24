import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { ContentComponent } from './content/content.component';
import { AuthenticationGuard } from '../services/authentication.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'puerta/:door',
    pathMatch: 'full',
    component: CaptchaComponent
  },
  {
    path: 'puerta/:door/contenido',
    pathMatch: 'full',
    component: ContentComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
