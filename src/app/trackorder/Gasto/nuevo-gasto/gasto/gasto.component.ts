import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CuentaComponent } from 'src/app/cuenta/cuenta.component';
import { CategoriaComponent } from '../../../../categoria/categoria.component';
import { OrderService } from 'src/app/trackorder/order-service/order-service.service';
import { tap } from 'rxjs/operators';
import { AgregarGastoRequest } from 'src/app/Interface/agregarGastoRequest';
import { Categoria } from 'src/app/Interface/Categoria';
import { cuentaDatos } from 'src/app/Interface/obtenerCuenta';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit, OnDestroy {
  categoria!: Categoria;
  categoriaSubscription: any;
  categorias: Categoria[] | undefined;
  obtenerCuenta: cuentaDatos[] | undefined;

  constructor(private dialog: MatDialog, public orderService: OrderService) {}

  ngOnInit(): void {
    this.MostrarCategoria();
    this.MostrarCuenta();
    this.categoriaSubscription = this.orderService.envioCategoria$.subscribe(
      (categoria: Categoria) => {
        this.llegaCategoria(categoria);
      }
    );

    this.categoriaSubscription = this.orderService.envioCuenta$.subscribe(
      (cuentas: cuentaDatos) => {
        this.llegaCuenta(cuentas);
      }
    );
  }

  ngOnDestroy(): void {
    this.categoriaSubscription.unsubscribe();
  }
  
  nuevoGasto = {
    fecha: '',
    importe: 0,
    categoria: '',
    cuenta: '',
    nota: ''
  };
  
  guardarGasto(): void {
    const agregarGastoRequest: AgregarGastoRequest = {
      Fecha: this.nuevoGasto.fecha,
      Monto: this.nuevoGasto.importe,
      Descripcion: this.nuevoGasto.nota,
      IDPresupuesto: 1,
      IDCategoriaGasto: 1,
    };

    this.orderService.sendDataToServer(agregarGastoRequest)
      .subscribe(
        response => {
          // Manejar respuesta
        },
        error => {
          console.error('Error al llamar a getCountOrders:', error);
        }
      );
  }

  // abrirCategoria(): void {
  //   if (!this.dialog.openDialogs.length) {
  //     this.dialog.open(CategoriaComponent, {
  //       width: '400px'
  //     });
  //   }
  // }

  abrirCuenta(): void {
    const dialogRef = this.dialog.open(CuentaComponent, {
      width: '400px'
    });
  }
  
  llegaCategoria(categoria: Categoria): void {
    this.nuevoGasto.categoria = categoria.nombre;
  }

  llegaCuenta(cuentas: cuentaDatos): void {
    this.nuevoGasto.cuenta = cuentas.nombre;
  }
  MostrarCategoria() {
    this.orderService
      .getCategories()
      .pipe()
      .subscribe(
        (categorias: Categoria[]) => {
          this.categorias = categorias;
        },
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
  seleccionarCategoria(categoria: Categoria): void {
    console.log(categoria,'llego aca)')
    // this.cerrarPopup();
    this.orderService.envioCategoria(categoria);
  }

}