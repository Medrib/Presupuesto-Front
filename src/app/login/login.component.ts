import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appComponent: AppComponent) { } // Inyecta el AppComponent

  ngOnInit(): void {
    this.appComponent.showHeader = false; // Oculta el encabezado
  }

  ngOnDestroy(): void {
    this.appComponent.showHeader = true; // Restaura la visibilidad del encabezado cuando el componente se destruye
  }
}
