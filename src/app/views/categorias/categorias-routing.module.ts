import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { Categoria } from './models/categoria';
import { CategoriaService } from './services/categorias.service';
import { listarCategoriasResolver } from './services/listar-categorias.resolver';

const selecionarCategoriaResolver: ResolveFn<Categoria> = (route: ActivatedRouteSnapshot) => {
  return inject(CategoriaService).selecionarPorId(parseInt(route.paramMap.get('id')!));
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCategoriasComponent,
    resolve: {categorias: listarCategoriasResolver}
  },
  {
    path: 'inserir',
    component: InserirCategoriaComponent
  },
  {
    path: 'editar/:id',
    component: EditarCategoriaComponent,
    resolve: {categoria: selecionarCategoriaResolver}
  },
  {
    path: 'excluir/:id',
    component: ExcluirCategoriaComponent,
    resolve: {categoria: selecionarCategoriaResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
