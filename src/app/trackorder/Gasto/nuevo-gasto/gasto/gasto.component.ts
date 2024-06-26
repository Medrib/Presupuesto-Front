import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { OrderService } from 'src/app/trackorder/order-service/order-service.service';
import { AgregarGastoRequest } from 'src/app/Interface/agregarGastoRequest';
import { Categoria } from 'src/app/Interface/Categoria';
import { cuentaDatos } from 'src/app/Interface/obtenerCuenta';
import { Gastos } from 'src/app/Gastos';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css'],
})
export class GastoComponent implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  obtenerCuenta: cuentaDatos[] = [];
  categoriaSubscription: Subscription = new Subscription();
  cuentaSubscription: Subscription = new Subscription();
  errorMessage: string = '';
  envioMessage: string = '';
  gastoForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    public orderService: OrderService,
    public dialogRef: MatDialogRef<GastoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
    this.MostrarCategoria();
    this.MostrarCuenta();

    this.categoriaSubscription = this.orderService.envioCategoria$.subscribe(
      (categoria: Categoria) => {
        this.llegaCategoria(categoria);
      }
    );
    this.cuentaSubscription = this.orderService.envioCuenta$.subscribe(
      (cuenta: cuentaDatos) => {
        this.llegaCuenta(cuenta);
      }
    );

    this.isEditMode = !!this.data?.gasto;

    if (this.isEditMode) {
      this.formValues();
    }
  }

  ngOnDestroy(): void {
    if (this.categoriaSubscription) {
      this.categoriaSubscription.unsubscribe();
    }
    if (this.cuentaSubscription) {
      this.cuentaSubscription.unsubscribe();
    }
  }

  iniciarForm(): void {
    this.gastoForm = this.fb.group({
      idCategoriaGasto: ['', Validators.required,],
      descripcion: ['',Validators.required,],
      fecha: [new Date().toISOString().split('T')[0], Validators.required,],
      idCuenta: ['', Validators.required,],
      monto: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],],
    });
  }

  formValues(): void {
    const gasto = this.data.gasto;
    const fechaFormateada = this.formatoFecha(gasto.fecha);
    console.log("Fecha: ",fechaFormateada);
    

    this.gastoForm.patchValue({
      idCategoriaGasto: gasto.idCategoriaGasto,
      descripcion: gasto.descripcion,
      fecha: fechaFormateada,
      idCuenta: gasto.idCuenta,
      monto: gasto.monto,
    });
  }

  private formatoFecha(dateString: string): string {
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      throw new Error('Formato de fecha invalido. Use DD/MM/YYYY');
    }
    
    const dia = parseInt(parts[0], 10);
    const mes = parseInt(parts[1], 10);
    const anio = parseInt(parts[2], 10);
  
    if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
      throw new Error('Formato de fecha invalido. Use DD/MM/YYYY');
    }
  
    const date = new Date(anio, mes - 1, dia);
  
    if (isNaN(date.getTime())) {
      throw new Error('Fecha invalida');
    }

    const formatoMes = ('0' + mes).slice(-2);
    const formatoDia = ('0' + dia).slice(-2);
    return `${anio}-${formatoMes}-${formatoDia}`;
  }

  MostrarCategoria() {
    this.orderService.getCategories().subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      (error) => {  
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  seleccionarCategoria(): void {
    const idCategoriaGasto = this.gastoForm.get('idCategoriaGasto')?.value;

    const categoria = this.categorias.find(
      (c) => c.idCategoriaGasto === idCategoriaGasto
    );
    if (categoria) {
      this.gastoForm.patchValue({
        idCategoriaGasto: categoria.idCategoriaGasto,
      });
    } else {
      // console.error('Categoria no encontrada para el valor:', idCategoriaGasto);
    }
  }

  llegaCategoria(categoria: Categoria): void {
    if (categoria) {
      this.gastoForm.patchValue({
        idCategoriaGasto: categoria.idCategoriaGasto,
      });
    }
  }

  MostrarCuenta() {
    this.orderService.getCuenta().subscribe(
      (cuentas: cuentaDatos[]) => {
        this.obtenerCuenta = cuentas;
        this.seleccionarCuenta();
      },
      (error) => {
        // console.error('Error al obtener cuentas:', error);
      }
    );
  }

  seleccionarCuenta(): void {
    const id = this.gastoForm.get('idCuenta')?.value;

    const cuentaSeleccion = this.obtenerCuenta.find((c) => c.idCuenta === id);

    if (cuentaSeleccion) {
      this.gastoForm.patchValue({ idCuenta: cuentaSeleccion.idCuenta });
    } else {
      // console.error('Cuenta no encontrada para el valor:', id);
    }
  }

  llegaCuenta(cuenta: cuentaDatos): void {
    if (cuenta) {
      this.gastoForm.patchValue({ idCuenta: cuenta.idCuenta });
    }
  }

  onSubmit(): void {
    if (this.gastoForm.valid) {
      const gasto: Gastos = {
        ...this.data.gasto,
        ...this.gastoForm.value,
      };

      if (this.isEditMode) {
        this.orderService.editarGasto(gasto).subscribe(
          (response) => {
            this.envioMessage = 'Gasto editado correctamente!';
            setTimeout(() => {
              this.dialogRef.close(true);
            },1000);
          },
          error => {
            this.errorMessage = 'Hubo un error al editar el gasto!';
            console.error('Error al editar el gasto:', error);
          }
        );
      }else {
        const agregarGastoRequest: AgregarGastoRequest = {
          Fecha: this.gastoForm.value.fecha,
          Monto: this.gastoForm.value.monto,
          Descripcion: this.gastoForm.value.descripcion,
          IDCuenta: this.gastoForm.value.idCuenta,
          CuentaName:this.obtenerCuenta.find((c) => c.idCuenta === this.gastoForm.value.idCuenta)?.nombre || '',
          IDPresupuesto: 1,
          IDCategoriaGasto: this.gastoForm.value.idCategoriaGasto,
          CategoriaGastoName:
            this.categorias.find((c) => c.idCategoriaGasto === this.gastoForm.value.idCategoriaGasto)?.nombre || '',
          PresupuestoName: '',
        };

        this.orderService.sendDataToServer(agregarGastoRequest).subscribe(
          (response: { data: string }) => {
            this.envioMessage = 'Gasto guardado correctamente!';

            setTimeout(() => {
              this.envioMessage = '';
            }, 3000);

            this.gastoForm.reset({
              idCategoriaGasto: '',
              descripcion: '',
              fecha: new Date().toISOString().split('T')[0],
              idCuenta: '',
              monto: '',
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
    }
  }

  afterClosed(): void {
    if (this.isEditMode) {
      this.dialogRef.close(false);
    } else {
      this.router.navigate(['/']);
    }
  }

  resetMessages(): void {
    this.envioMessage = '';
    this.errorMessage = '';
  }
}
