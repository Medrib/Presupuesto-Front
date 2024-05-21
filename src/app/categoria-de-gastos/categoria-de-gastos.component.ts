import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Categoria } from '../Interface/Categoria';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { ColumnsCategoria } from '../Interface/columns-track-order-list';
import { AgregarCategoriaRequest } from '../Interface/agregarCategoriaRequest';

@Component({
  selector: 'app-categoria-de-gastos',
  templateUrl: './categoria-de-gastos.component.html',
  styleUrls: ['./categoria-de-gastos.component.css']
})
export class CategoriaDeGastosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idCategoriaGasto', 'Nombre', 'Descripcion', 'Editar'];
  dataSource = new MatTableDataSource<ColumnsCategoria>();
  totalItems!: number;
  pageSize: number = 5;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nuevaCategoria = {
    categoria: '',
    descripcion: ''
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.paginacion();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private mapCategoriaToColumnsCategoria(categorias: Categoria[]): ColumnsCategoria[] {
    return categorias.map(categoria => ({
      idCategoriaGasto: categoria.idCategoriaGasto,
      Nombre: categoria.nombre,
      Descripcion: categoria.descripcion
    }));
  }

  agregarCategoria(): void {
    const nuevaCategoria: AgregarCategoriaRequest = {
      nombre: this.nuevaCategoria.categoria,
      descripcion: this.nuevaCategoria.descripcion
    };

    this.orderService.insertCategory(nuevaCategoria).subscribe(
      (response: { data: string }) => {
        console.log('Respuesta del servidor:', response.data);
        this.paginacion(this.pageIndex, this.pageSize);
        this.nuevaCategoria = { categoria: '', descripcion: '' };
      },
      (error) => {
        console.error('Error al agregar categoría:', error);
      }
    );
  }

  paginacion(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    this.orderService.getCategories().subscribe(
      (categorias: Categoria[]) => {
        this.totalItems = categorias.length;
        const paginatedData = categorias.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
        this.dataSource.data = this.mapCategoriaToColumnsCategoria(paginatedData);
      },
      (error) => {
        console.error('Error al llamar al Servicio:', error);
      }
    );
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginacion(this.pageIndex, this.pageSize);
  }  
}
