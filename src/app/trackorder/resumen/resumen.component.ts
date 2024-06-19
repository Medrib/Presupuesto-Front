import { Component, ViewChild } from '@angular/core';
import { OrderService } from '../order-service/order-service.service';
import { Categoria } from 'src/app/Interface/Categoria';
import { MatTableDataSource } from '@angular/material/table';
import { columnsResumen } from 'src/app/Interface/columns-track-order-list';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NuevoResumenComponent } from 'src/app/nuevo-resumen/nuevo-resumen.component';
import { BehaviorSubject } from 'rxjs';
import { Pagination } from 'src/app/Interface/Pagination';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent {
  displayedColumns: string[] = ['Categoria', 'Dinero inicial', 'Gasto', 'Dinero disponible'];
  dataSource = new MatTableDataSource<columnsResumen>();
  totalItems!: number;
  pageSize: number = 5;
  pageIndex: number = 0;
  element: any;

  public paginationRequestCache$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({
    pageNumber: this.pageIndex,
    pageSize: this.pageSize,
  });

  constructor(private orderService: OrderService, private dialog: MatDialog, public dialogRef: MatDialogRef<ResumenComponent>,) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.paginacion();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // private mapCategoriaToColumnsCategoria(categorias: Categoria[]): columnsResumen[] {
  //   return categorias.map(categoria => ({
  //   }));
  // }

  paginacion(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    this.orderService.getCategories().subscribe(
      (categorias: Categoria[]) => {
        this.totalItems = categorias.length;
        const paginatedData = categorias.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
        // this.dataSource.data = this.mapCategoriaToColumnsCategoria(paginatedData);
      },
      (error) => {
        console.error('Error al llamar al Servicio:', error);
      }
    );
  }
  applyPagination(pageNumber: number, pageSize: number): void {
    this.paginationRequestCache$.next({ pageNumber: pageNumber, pageSize: pageSize });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginacion(this.pageIndex, this.pageSize);
  } 

  abrirPopupEditar(element: columnsResumen): void {    
    const dialogRef = this.dialog.open(NuevoResumenComponent, {
      width: '500px',
      height: '500px',
      data: {
        gasto: {
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applyPagination(this.pageIndex, this.pageSize);
      }
    });
  }
}
