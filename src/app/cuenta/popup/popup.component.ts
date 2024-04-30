import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Output() optionSelected = new EventEmitter<string>();

  options: string[] = [
    'Efectivo',
    'Cuentas',
    'Tarjetas de crédito',
    'Tarjetas de débito',
    'Ahorros',
    'Tarjeta prepago',
    'Inversiones',
    'Préstamos',
    'Seguros',
    'Otros'
  ];

  onSelect(option: string) {
    this.optionSelected.emit(option);
  }
}