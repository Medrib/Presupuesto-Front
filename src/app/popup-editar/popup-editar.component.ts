
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { ColumnsTrackOrderList } from '../Interface/columns-track-order-list';
@Component({
  selector: 'app-popup-editar',
  templateUrl: './popup-editar.component.html',
  styleUrls: ['./popup-editar.component.css']
})

export class PopupEditarComponent {

  gasto: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  orderService : OrderService) {
    if (data.gasto) {
      this.gasto = {
        IDGasto: data.gasto.id,
        Fecha: data.gasto.Fecha,
        Monto: data.gasto.Monto,
        Descripcion: data.gasto.Descripcion || '',
        IdCuenta: data.gasto.IdCuenta,
        IDPresupuesto: data.gasto.IDPresupuesto,
        IDCategoriaGasto: data.gasto.IDCategoriaGasto
      };
    
  } 
  else {
    this.gasto = {
      IDGasto: 0,
      Fecha: null,
      Monto: 0,
      Descripcion: '',
      IdCuenta: 0,
      IDPresupuesto: 0,
      IDCategoriaGasto: 0
    };
  }
}

guardarCambios(): void {
  if (this.gasto) {
    this.orderService.editarGasto(this.gasto).subscribe(
      () => {
        console.log('Gasto editado correctamente');
      },
      (error: any) => {
        console.error('Error al editar el gasto', error);
      }
    );
  }
}}


