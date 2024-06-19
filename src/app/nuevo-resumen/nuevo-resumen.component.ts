import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResumenComponent } from '../trackorder/resumen/resumen.component';
import { OrderService } from '../trackorder/order-service/order-service.service';
import { Categoria } from '../Interface/Categoria';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nuevo-resumen',
  templateUrl: './nuevo-resumen.component.html',
  styleUrls: ['./nuevo-resumen.component.css'],
})
export class NuevoResumenComponent {
  categorias: Categoria[] = [];
  categoriaSubscription: Subscription = new Subscription();
  gastoForm: any;
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ResumenComponent>
  ) {}

  ngOnInit(): void {
    this.MostrarCategoria();

    this.categoriaSubscription = this.orderService.envioCategoria$.subscribe(
      (categoria: Categoria) => {
        this.llegaCategoria(categoria);
      }
    );
    }

  ngOnDestroy(): void {
    if (this.categoriaSubscription) {
      this.categoriaSubscription.unsubscribe();
    }
  }

  llegaCategoria(categoria: Categoria) {
    if (categoria) {
      this.gastoForm.patchValue({
        idCategoriaGasto: categoria.idCategoriaGasto,
      });
    }  
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
    const categoria = this.categorias.find((c) => c.idCategoriaGasto === idCategoriaGasto);
    if (categoria) {
      this.gastoForm.patchValue({
        idCategoriaGasto: categoria.idCategoriaGasto
      });
    } else {
      console.error('Categoria no encontrada para el valor:', idCategoriaGasto);
    }
  }

  afterClosed(): void {
    this.dialogRef.close(false);
  }
}
