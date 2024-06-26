import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CuentaComponent } from 'src/app/cuenta/cuenta.component';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit{
  dialog: any;
  transferenciaForm !:FormGroup;
  fecha !: string



  constructor(
    private dialogService: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.dialog = dialogService;
  }
  ngOnInit(): void {
    this.iniciarDatos()
  }
  iniciarDatos():void{
    this.transferenciaForm = this.fb.group({
      importe:['',Validators.required,],
      de:['',Validators.required,],
      a:['',Validators.required,],
      nota:['',Validators.required,],
      fecha: [ new Date().toISOString().split('T')[0], Validators.required,],
    })
  }

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
