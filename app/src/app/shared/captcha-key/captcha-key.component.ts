import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha-key',
  templateUrl: './captcha-key.component.html',
  styleUrls: ['./captcha-key.component.scss']
})
export class CaptchaKeyComponent implements OnInit {

  @Output() position = new EventEmitter<number>();

  public rotate: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  left() {
    if (this.rotate !== 0) {
      this.rotate -= 90;
    } else {
      this.rotate = 270;
    }
    this.position.emit(this.rotate);
  }

  right() {
    if (this.rotate !== 270) {
      this.rotate += 90;
    } else {
      this.rotate = 0;
    }
    this.position.emit(this.rotate);
  }

}
