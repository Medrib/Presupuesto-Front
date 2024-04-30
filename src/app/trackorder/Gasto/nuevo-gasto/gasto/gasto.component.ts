import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CuentaComponent } from 'src/app/cuenta/cuenta.component';
import { CategoriaComponent } from '../../../../categoria/categoria.component';
import { OrderService } from 'src/app/trackorder/order-service/order-service.service';
import { Observable, catchError, tap } from 'rxjs';
import { AgregarGastoRequest } from 'src/app/Interface/agregarGastoRequest';
import { Filters } from 'src/app/filter';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements  OnInit {
  dialog: any;
  totalItems: number = 0;
  diálogoAbierto: boolean = false;
  filters !: Filters
  fechaNueva !: Date;
 
  
  constructor(private dialogService: MatDialog ,public orderService: OrderService){
    this.dialog = dialogService;
  }

  ngOnInit(){
  }
  nuevoGasto = {
    fecha: '',
    importe: 0,
    categoria: '',
    cuenta: '',
    nota: ''
  };
  
guardarGasto() {
  const agregarGastoRequest: AgregarGastoRequest = {
    Fecha: this.nuevoGasto.fecha,
    Monto: this.nuevoGasto.importe,
    Descripcion: this.nuevoGasto.nota,
    IDPresupuesto: 1,
    IDCategoriaGasto: 1,
  };

    return this.orderService.sendDataToServer(agregarGastoRequest).pipe(
      tap(data => console.log('Datos recibidos en getCountOrders:', data))
    ).subscribe(
      response => {
      },
      error => {
        console.error('Error al llamar a getCountOrders:', error);
      }
    );
  }

abrirCalculadora() {} 

abrirCuenta(): void {
  if (!this.diálogoAbierto) {
    this.diálogoAbierto = true;
    const dialogRef = this.dialog.open(CuentaComponent, {
      width: '400px',  // Ancho del popup
    }); 
  }}
  abrirCategoria(): void {
    if (!this.diálogoAbierto) {
      this.diálogoAbierto = true;
      const dialogRef = this.dialog.open(CategoriaComponent, {
        width: '400px',
      }); 
    }}
  }