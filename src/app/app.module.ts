import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { OrderTrackingComponent } from './trackorder/order-tracking/order-tracking.component';
import { GestionDeStockComponent } from './trackorder/gestion-de-stock/gestion-de-stock.component';
import { ResumenComponent } from './trackorder/resumen/resumen.component';
import { OrderTrackingListComponent } from './trackorder/order-tracking-list/order-tracking-list.component';
import { HeaderComponent } from './trackorder/track-order-header/header.component';
import { ExportComponent } from './trackorder/export/export.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LanguageService } from './trackorder/order-service/language-control-service.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { OrderTrackingSearchComponent } from './trackorder/order-tracking-list/order-tracking-search/order-tracking-search.component';
import { NuevoGastoComponent } from './trackorder/Gasto/nuevo-gasto/nuevo-gasto.component';
import { GastoComponent } from './trackorder/Gasto/nuevo-gasto/gasto/gasto.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GestorDeCuentasComponent } from './cuenta/gestor-de-cuentas/gestor-de-cuentas.component';
import { TransferenciaComponent } from './trackorder/Gasto/nuevo-gasto/transferencia/transferencia.component';
import { IngresoComponent } from './trackorder/Gasto/nuevo-gasto/ingreso/ingreso.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaDeGastosComponent } from './categoria-de-gastos/categoria-de-gastos.component';
import { PopupComponent } from './cuenta/popup/popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PopupEditarComponent } from './popup-editar/popup-editar.component';




@NgModule({
  declarations: [
    AppComponent,
    OrderTrackingComponent,
    GestionDeStockComponent,
    ResumenComponent,
    OrderTrackingListComponent,
    HeaderComponent,
    ExportComponent,
    LoginComponent,
    OrderTrackingSearchComponent,
    NuevoGastoComponent,
    GastoComponent,
    CuentaComponent,
    GestorDeCuentasComponent,
    TransferenciaComponent,
    IngresoComponent,
    CategoriaComponent,
    CategoriaDeGastosComponent,
    PopupComponent,
    PopupEditarComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpTransalteFactory,
            deps: [HttpClient]
        }
    }),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'header', component: HeaderComponent },
      
    ])
  ],
  
  providers: [LanguageService], 
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpTransalteFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}