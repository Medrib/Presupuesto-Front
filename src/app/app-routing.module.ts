import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDeStockComponent } from './trackorder/gestion-de-stock/gestion-de-stock.component';
import { OrderTrackingComponent } from './trackorder/order-tracking/order-tracking.component';
import { ResumenComponent } from './trackorder/resumen/resumen.component';
import { OrderTrackingListComponent } from './trackorder/order-tracking-list/order-tracking-list.component';
import { HeaderComponent } from './trackorder/track-order-header/header.component';
import { LoginComponent } from './login/login.component';
import { GastoComponent } from './trackorder/Gasto/nuevo-gasto/gasto/gasto.component';
import { GestorDeCuentasComponent } from './cuenta/gestor-de-cuentas/gestor-de-cuentas.component';
import { TransferenciaComponent } from './trackorder/Gasto/nuevo-gasto/transferencia/transferencia.component';
import { IngresoComponent } from './trackorder/Gasto/nuevo-gasto/ingreso/ingreso.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaDeGastosComponent } from './categoria-de-gastos/categoria-de-gastos.component';

const routes: Routes = [
     
    { path: '', component: OrderTrackingListComponent},
    { path:'GestionDeStock', component: GestionDeStockComponent},
    { path:'OrderTracking', component: OrderTrackingComponent},
    { path:'Resumen', component: ResumenComponent},
    { path:'OrderTrackingList', component: OrderTrackingListComponent},
    { path:'gasto', component: GastoComponent},
    { path:'GestorDeCuentas', component: GestorDeCuentasComponent},
    { path:'transferencia', component: TransferenciaComponent},
    { path:'ingreso', component: IngresoComponent},
    { path:'categoria', component: CategoriaComponent},
    { path:'categoriaDeGastos', component: CategoriaDeGastosComponent}

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
