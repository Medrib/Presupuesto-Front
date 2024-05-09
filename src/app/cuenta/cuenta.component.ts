import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { cuentaDatos } from '../Interface/obtenerCuenta';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css'],
})
export class CuentaComponent implements OnInit {
  mostrarLapiz: boolean = true;
  cuentas: string = "";
  obtenerCuenta: cuentaDatos[] = [];
  agregarCuenta!: cuentaDatos;
  opcionSeleccionada: string = "";

  constructor(
    public dialogRef: MatDialogRef<CuentaComponent>,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.MostrarCuenta();
  }

  cerrarPopup(): void {
    this.dialogRef.close();
  }

  abrirNuevoDialogo(): void {
    this.mostrarLapiz = false;
  }

  guardarValor() {
    this.mostrarLapiz = true;
    const agregarCuenta: cuentaDatos = {
      nombre: this.cuentas,
    };
    this.agregarCuenta = agregarCuenta;
    return this.orderService
      .insertCuenta(agregarCuenta)
      .pipe()
      .subscribe(
        (response) => {},
        (error) => {
          console.error('Error al llamar al Servicio:', error);
        }
      );
  }

  MostrarCuenta() {
    this.orderService
      .getCuenta()
      .pipe()
      .subscribe(
        (cuenta: cuentaDatos[]) => {
          this.obtenerCuenta = cuenta;
        },
        (error) => {
          console.error('Error al llamar al Servicio:', error);
        }
      );
  }

  seleccionarCuenta(cuenta: cuentaDatos): void {
    this.cerrarPopup();
    this.opcionSeleccionada = cuenta.nombre;
    this.orderService.envioCuenta(cuenta);
  }
}