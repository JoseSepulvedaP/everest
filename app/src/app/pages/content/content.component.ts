import { Component, OnInit } from '@angular/core';
import { CaptchaService } from '../../services/captcha.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public doorStorage: string;
  public doorApp: string;
  public contentDoor: any;
  public key: string;
  public start: number;
  public end: number;

  constructor(
    private _captchaService: CaptchaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.doorStorage = this._captchaService.getStorage();
    this.route.params.subscribe(params => this.doorApp = params.door);
    if (this.doorStorage !== this.doorApp) {
      localStorage.clear();
      Swal.fire({
        icon: 'error',
        title: 'Acceso Restringido!!!',
        text: 'Selecciona una puerta para ver su maravilloso contenido'
      });
      this.router.navigate(['/']);
    }
    this.getContentData();
   }

  ngOnInit(): void { }

  goHome() {
    this.router.navigate(['/']);
  }

  getContentData() {
    switch (this.doorApp) {
      case 'A': this.key = '0Lsbn-DQj3k';
                this.start = 195;
                this.end = 220;
        break;
      case 'B': this.key = 'Kwzb7NBilkk';
                this.start = 110;
                this.end = 147;
        break;
      case 'C': this.key = 'KvFp3M8Iz6M';
                this.start = 120;
                this.end = 154;
        break;
    }
  }

}
