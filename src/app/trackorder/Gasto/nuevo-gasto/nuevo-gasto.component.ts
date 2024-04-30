import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.component.html',
  styleUrls: ['./nuevo-gasto.component.css']
})
export class NuevoGastoComponent {
  mostrarFormulario! : any;
  constructor(
    private router : Router
  ){

  }
  // abrirFormulario(){

  // }
  // redirigir() {
  //   this.router.navigate(['/src/app/gasto/gasto.component.ts']);
  // }
}
