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
  styleUrls: ['./gasto.component.css'],
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
    monto: 0,
    descripcion: '',
    idCuenta: 0,
    idPresupuesto: 0,
    idCategoriaGasto: 0,
    categoria: '',
    cuenta: '',
    presupuesto: '',
  };

  guardarGasto(): void {
    const agregarGastoRequest: AgregarGastoRequest = {
      Fecha: this.nuevoGasto.fecha,
      Monto: this.nuevoGasto.monto,
      Descripcion: this.nuevoGasto.descripcion,
      IDCuenta: this.nuevoGasto.idCuenta,
      CuentaName: this.nuevoGasto.cuenta,
      IDPresupuesto: this.nuevoGasto.idPresupuesto,
      IDCategoriaGasto: this.nuevoGasto.idCategoriaGasto,
      CategoriaGastoName: this.nuevoGasto.categoria,
      PresupuestoName: this.nuevoGasto.presupuesto,
    };

    this.orderService.sendDataToServer(agregarGastoRequest).subscribe(
      (response: { data: string }) => {
        this.nuevoGasto = {
          fecha: '',
          monto: 0,
          descripcion: '',
          idCuenta: 0,
          idPresupuesto: 0,
          idCategoriaGasto: 0,
          categoria: '',
          cuenta: '',
          presupuesto: '',
        };
      },
      (error) => {
        console.error('Error al llamar a sendDataToServer:', error);
      }
    );
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
  seleccionarCategoria(): void {
    const categoria: Categoria = this.nuevoGasto.categoria as unknown as Categoria;
    if (categoria) {
      this.orderService.envioCategoria(categoria);
      // console.log(`Categoria seleccionada: ID = ${categoria.idCategoriaGasto}, Nombre = ${categoria.nombre}`);
    }
  }

  llegaCategoria(categoria: Categoria): void {
    if (categoria) {
      this.nuevoGasto.idCategoriaGasto = categoria.idCategoriaGasto;
      this.nuevoGasto.categoria = categoria.nombre;
    }
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

  seleccionarCuenta() {
    const cuenta: cuentaDatos = this.nuevoGasto.cuenta as unknown as cuentaDatos;
    if (cuenta) {
      this.orderService.envioCuenta(cuenta);
    }
  }

  llegaCuenta(cuenta: cuentaDatos): void {
    if (cuenta) {
      this.nuevoGasto.idCuenta = cuenta.idCuenta;
      this.nuevoGasto.cuenta = cuenta.nombre;
    }
  }
}
