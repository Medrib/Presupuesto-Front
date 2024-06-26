import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../../order-service/order-service.service';
import { AgregarIngresoRequest } from '../../../../Interface/agregarIngresoRequest';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {
  dialog: any;
  monto!: number ;
  fecha!: string;
  descripcion!: string;
  ingresoForm!: FormGroup;
  errorMessage: string = '';
  envioMessage: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService : OrderService
  ) { }

  ngOnInit(): void {
    this.iniciarDatos()
    }

  iniciarDatos():void{
    this.ingresoForm = this.fb.group({
      monto:  ['', Validators.required,],
      fecha: [ new Date().toISOString().split('T')[0], Validators.required,],
      descripcion:  ['', Validators.required,],
      IDPresupuesto: [1, Validators.required,]
    })
  }
  guardarDatos() {
    const data : AgregarIngresoRequest = {
      Monto: this.ingresoForm.value.monto,
      Fecha: this.ingresoForm.value.fecha,
      Descripcion: this.ingresoForm.value.descripcion,
      IDPresupuesto : 1,

    };
    return this.orderService.postIngreso(data).pipe(
    ).subscribe(
      (response: { data: string }) => {
        this.envioMessage = "Datos ingresados correctamente"

        setTimeout(() => {
          this.envioMessage = '';
        }, 3000);
        
        this.ingresoForm.reset({
          monto: '',
          fecha: new Date().toISOString().split('T')[0],
          descripcion: '',
          IDPresupuesto : 1,
        })
      },
      error => {
        this.errorMessage = "Error al ingresar datos";
        console.error('Error al llamar al Servicio:', error);
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  resetMessages(): void {
    this.envioMessage = '';
    this.errorMessage = '';
  }
}