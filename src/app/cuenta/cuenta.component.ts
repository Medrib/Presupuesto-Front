import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { tap } from 'rxjs';
import { AgregarCategoriaRequest } from '../Interface/agregarCategoriaRequest';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  mostrarLapiz: boolean = true;
  categoria: string = '';

  constructor(public dialogRef: MatDialogRef<CuentaComponent>,
    private orderService : OrderService
  ) { }
   
  ngOnInit(): void { }

  cerrarPopup(): void {
    this.dialogRef.close();
  }

  abrirNuevoDialogo(): void {
    this.mostrarLapiz = false;
  }

  guardarValor() {
    this.mostrarLapiz = true;
    const categoriaNueva : AgregarCategoriaRequest = {
      nombre : this.categoria
    }
    return this.orderService.insertCategory(categoriaNueva).pipe(
    ).subscribe(
      response => {
      },
      error => {
        console.error('Error al llamar al Servicio:', error);
      }
    );
  }
}