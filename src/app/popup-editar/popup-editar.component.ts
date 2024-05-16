import { Component, Inject, OnInit, importProvidersFrom } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { gastosRequest } from '../Interface/agregarGastoRequest';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-popup-editar',
  templateUrl: './popup-editar.component.html',
  styleUrls: ['./popup-editar.component.css']
})
export class PopupEditarComponent implements OnInit {
  error: string | undefined;
  gasto: gastosRequest | undefined;

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<PopupEditarComponent>,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
  }
  
  MostrarGastos() {
    this.orderService
      .obtenerGasto()
      .pipe()
      .subscribe(
        (gastos: gastosRequest[]) => {
          if (gastos.length > 0) {
            this.gasto = gastos[0];
            this.cdr.detectChanges();
          }
          console.log("datos obtenidos", gastos)
        },
        (error) => {
          console.error('Error al llamar al Servicio:', error);
        }
      );
  }

  // guardarCambios(): void {
  //   if (this.gasto && this.gasto.id) {
  //     this.orderService.editarGasto(this.gasto).subscribe(() => {
  //       console.log('Gasto editado correctamente');
  //     });
  //   } else {
  //     console.error('Hubo un error al editar el gasto');
  //   }
  // }

  cerrarPopup(): void {
    this.dialogRef.close();
  }
}
