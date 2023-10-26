import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarNotasComponent } from './listar-notas/listar-notas.component';
import { Nota } from './models/nota';
import { NotaService } from './services/notas.service';
import { InserirNotaComponent } from './inserir-nota/inserir-nota.component';
import { listarCategoriasResolver } from '../categorias/services/listar-categorias.resolver';
import { EditarNotaComponent } from './editar-nota/editar-nota.component';
import { ExcluirNotaComponent } from './excluir-nota/excluir-nota.component';

const listarNotasResolver: ResolveFn<Nota[]> = () => {
  return inject(NotaService).selecionarTodos();
};

const selecionarNotaResolver: ResolveFn<Nota> = (route: ActivatedRouteSnapshot) => {
  return inject(NotaService).selecionarPorId(parseInt(route.paramMap.get('id')!));
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarNotasComponent,
    resolve: {notas: listarNotasResolver }
  },
  {
    path: 'inserir',
    component: InserirNotaComponent,
    resolve: { categorias: listarCategoriasResolver }
  },
  {
    path: 'editar/:id',
    component: EditarNotaComponent,
    resolve: {
      nota: selecionarNotaResolver,
      categorias: listarCategoriasResolver
    }
  },
  {
   path: 'excluir/:id',
   component: ExcluirNotaComponent,
  resolve: {nota: selecionarNotaResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasRoutingModule { }
