import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriaService } from './services/categorias.service';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';

import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';


@NgModule({
  declarations: [
    ListarCategoriasComponent,
    InserirCategoriaComponent,
    ExcluirCategoriaComponent,
    EditarCategoriaComponent
  ],
  imports: [
    CategoriasRoutingModule,
    SharedModule,],
  providers: [
    CategoriaService
  ]
})
export class CategoriasModule { }
