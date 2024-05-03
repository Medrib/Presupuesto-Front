import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-de-gastos',
  templateUrl: './categoria-de-gastos.component.html',
  styleUrls: ['./categoria-de-gastos.component.css']
})
export class CategoriaDeGastosComponent implements OnInit {

  categoria: string = '';

  constructor(){ }

  ngOnInit(): void { }

  validarCategoria() { }

  agregarCategoria() { }
}
