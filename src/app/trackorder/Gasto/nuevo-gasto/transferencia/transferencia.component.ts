import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CuentaComponent } from 'src/app/cuenta/cuenta.component';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent {
  dialog: any;


  constructor(private dialogService: MatDialog){
    this.dialog = dialogService;
  }
  nuevoGasto = {
    fecha: '',
    importe: 0,
    categoria: '',
    cuenta: '',
    nota: ''
  };
  guardarGasto() { }
  abrirCalculadora() { }

  diálogoAbierto: boolean = false;

  abrirCuenta(): void {
    if (!this.diálogoAbierto) {
      this.diálogoAbierto = true;
      const dialogRef = this.dialog.open(CuentaComponent, {
        width: '400px', // Ancho del popup
      }); 
    }}
}
