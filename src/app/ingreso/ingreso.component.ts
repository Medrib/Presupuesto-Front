import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { AgregarIngresoRequest } from '../Interface/agregarIngresoRequest';
import { tap } from 'rxjs';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {
  dialog: any;
  monto!: number ;
  fecha!: string;
  descripcion!: string;

  constructor(private http: HttpClient,
              private orderService : OrderService
             ) { }

  guardarDatos() {
    const data : AgregarIngresoRequest = {
      Monto: this.monto,
      Fecha: this.fecha,
      Descripcion: this.descripcion,
      IDPresupuesto : 1
    };
    return this.orderService.postIngreso(data).pipe(
      tap(data => console.log('Datos recibidos de postIngreso:', data))
    ).subscribe(
      response => {
      },
      error => {
        console.error('Error al llamar al Servicio:', error);
      }
    );
  }
}
  




