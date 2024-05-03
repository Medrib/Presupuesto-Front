import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AgregarCategoriaRequest } from '../Interface/agregarCategoriaRequest';
import { tap } from 'rxjs/operators';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { Categoria } from '../Interface/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  mostrarLapiz: boolean = true;
  categoria: string = '';
  categorias: Categoria[] = [];
  categoriaNueva!: AgregarCategoriaRequest;

  constructor(public dialogRef: MatDialogRef<CategoriaComponent>, private orderService: OrderService) {}

  ngOnInit(): void {
    this.MostrarCategoria();
  }

  abrirNuevoDialogo(): void {
    this.mostrarLapiz = false;
  }

  cerrarPopup(): void {
    this.dialogRef.close();
  }

  guardarValor() {
    this.mostrarLapiz = true;
    this.categoriaNueva = {
      nombre: this.categoria
    };
    return this.orderService.insertCategory(this.categoriaNueva).pipe(
      tap(data => {})
    ).subscribe(
      response => {
      },
      error => {
        console.error('Error al llamar al Servicio:', error);
      }
    );
  }

  MostrarCategoria() {
    this.orderService.getCategories().pipe(
    ).subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      error => {
        console.error('Error al llamar al Servicio:', error);
      }
    );
  }

  seleccionarCategoria(categoria: Categoria): void {
    this.cerrarPopup();
    this.orderService.envioCategoria(categoria);
  }
}