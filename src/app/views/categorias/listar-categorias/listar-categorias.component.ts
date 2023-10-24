import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categorias.service';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit{
  categorias$?: Observable<Categoria[]>;

  constructor(private categoriasService: CategoriaService) {}

  ngOnInit(): void {
    this.categorias$ = this.categoriasService.selecionarTodos();
  }
}
