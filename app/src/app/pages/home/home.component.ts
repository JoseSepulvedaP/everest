import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public doors: Array<Object>;
  public instruction: string;

  constructor(
    private router: Router
  ) {
    this.doors = [
      {
        key: 'A',
        name: 'Puerta A'
      },
      {
        key: 'B',
        name: 'Puerta B'
      },
      {
        key: 'C',
        name: 'Puerta C'
      },
    ];
    this.instruction = 'Selecciona una puerta para ver su maravilloso contenido';
  }

  ngOnInit(): void { }

  onClick(door: string) {
    this.router.navigate([`/puerta/${door}`]);
  }

}
