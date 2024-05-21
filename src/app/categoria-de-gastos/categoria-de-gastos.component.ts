import { Component, OnInit } from '@angular/core';
import { Categoria } from '../Interface/Categoria';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnsCategoria } from '../Interface/columns-track-order-list';
import { AgregarCategoriaRequest } from '../Interface/agregarCategoriaRequest';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { Pagination } from '../Interface/Pagination';
import { PagingDataRequest } from '../paging-data-request';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Filters } from '../filter';
import { Sorting } from '../sort';

@Component({
  selector: 'app-categoria-de-gastos',
  templateUrl: './categoria-de-gastos.component.html',
  styleUrls: ['./categoria-de-gastos.component.css']
})
export class CategoriaDeGastosComponent implements OnInit {
  nuevaCategoria = {
    categoria: '',
    descripcion: ''
  }

  categoria: string = '';
  categorias: Categoria[] | undefined;
  dataSource = new MatTableDataSource<ColumnsCategoria>();
  displayedColumns: string[] = ['idCategoriaGasto', 'Nombre', 'Descripcion', 'Editar'];
  element: any;

  public totalItems!: number;
  public startIndex = 1;
  public pageSize: number = 5;
  public pageIndex: number = 1;
  public paginationRequestCache$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({
    pageNumber: this.pageIndex,
    pageSize: this.pageSize,
  });
  export: ColumnsCategoria[] | undefined;

  private mapOrdersToCategoria(orders: Categoria[]): ColumnsCategoria[] {
    if (!orders) {
      console.error('Received undefined or null orders array');
      return [];
    }
    return orders.map(order => {
      return this.mapOrderToColumnsTrackOrderList(order);
    });
  }

  private mapOrderToColumnsTrackOrderList(order: Categoria): ColumnsCategoria {
    return {
      idCategoriaGasto: order.idCategoriaGasto,
      Nombre: order.nombre,
      Descripcion: order.descripcion
    };
  }

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.MostrarCategoria();
    this.getDataFromGrid();
  }

  validarCategoria() { }

  MostrarCategoria() {
    this.orderService
      .getCategories()
      .subscribe(
        (categorias: Categoria[]) => {
          if (!categorias) {
            console.error('No categories received from the service');
            return;
          }
          const dataMapped: ColumnsCategoria[] = categorias.map(categoria => ({
            idCategoriaGasto: categoria.idCategoriaGasto,
            Nombre: categoria.nombre,
            Descripcion: categoria.descripcion
          }));
          console.log("categorias: ", categorias);

          this.dataSource.data = dataMapped;
          this.categorias = categorias;
        },
        (error) => {
          console.error('Error al llamar al Servicio:', error);
        }
      );
  }

  agregarCategoria() {
    const nuevaCategoria: AgregarCategoriaRequest = {
      nombre: this.nuevaCategoria.categoria,
      descripcion: this.nuevaCategoria.descripcion
    };

    this.orderService.insertCategory(nuevaCategoria).subscribe(
      (response: { data: string }) => {
        console.log('Respuesta del servidor:', response.data);
        this.MostrarCategoria();
        this.nuevaCategoria = { categoria: '', descripcion: '' };

      },
      (error) => {
        console.error('Error al agregar categoria:', error);
      }
    );
  }

  getDataFromGrid(): void {
    const defaultSorting: Sorting = {
      sortBy: 'asc',
      ColumnName: 'nombre'
    };

    combineLatest([
      this.paginationRequestCache$
    ]).pipe(
      switchMap(([paginationRequest]) => 
        this.getData(paginationRequest.pageNumber ?? 1, defaultSorting, paginationRequest)
      )
    ).subscribe((data: ColumnsCategoria[]) => {
      this.dataSource.data = data;
      this.export = data;
    });
  }

  getData(searchKeyword: number, orderBy: Sorting, paginationRequest: Pagination): Observable<ColumnsCategoria[]> {
    const filters: Filters = {
      Id: searchKeyword
    };

    return this.orderService.getDataFromCategoria(filters, orderBy, paginationRequest).pipe(
      tap((response: { data: Categoria[], totalItems: number }) => {
        if (!response || !response.data) {
          console.error('Invalid response received from the service');
          return;
        }
        this.totalItems = response.totalItems;
      }),
      map((response: { data: Categoria[], totalItems: number }) => this.mapOrdersToCategoria(response.data))
    );
  }

  applyPagination(pageNumber: number, pageSize: number): void {
    this.paginationRequestCache$.next({ pageNumber: pageNumber, pageSize: pageSize });
  }

  onPageChange(event: PageEvent): void {
    console.log("cambiar pag");
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.applyPagination(this.pageIndex, event.pageSize);
  }
}
