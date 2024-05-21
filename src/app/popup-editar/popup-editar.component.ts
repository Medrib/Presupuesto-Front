
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { ColumnsTrackOrderList } from '../Interface/columns-track-order-list';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { gastosRequest } from '../Interface/agregarGastoRequest';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-popup-editar',
  templateUrl: './popup-editar.component.html',
  styleUrls: ['./popup-editar.component.css']
})

export class PopupEditarComponent {

  gasto: any;
  gastoAEditar!: ColumnsTrackOrderList;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  orderService : OrderService) {
    if (data.gasto) {
      this.gasto = {
        IDGasto: data.gasto.id,
        Fecha: this.formatDate(data.gasto.Fecha),
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
private formatDate(date: string): string {
  // Formatear la fecha al formato ISO 8601 si es necesario
  // Por ejemplo, convertir "17/05/2024" a "2024-05-17T00:00:00"
  const parts = date.split('/');
  if (parts.length === 3) {
    const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`;
    return isoDate;
  }
  return date; // Devolver la fecha sin cambios si no se puede formatear
}
guardarCambios(): void {
  if (this.gasto) {
    this.orderService.editarGasto(this.gasto).subscribe(
      () => {
        console.log('Gasto editado correctamente');
        // Aquí puedes cerrar el popup o actualizar el estado
      },
      (error: any) => {
        console.error('Error al editar el gasto', error);
        // Maneja el error (mostrar un mensaje de error, etc.)
      }
    );
  }
}}


