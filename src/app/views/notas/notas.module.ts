import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListarNotasComponent } from './listar-notas/listar-notas.component';
import { NotaService } from './services/notas.service';
import { InserirNotaComponent } from './inserir-nota/inserir-nota.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EditarNotaComponent } from './editar-nota/editar-nota.component';
import { ExcluirNotaComponent } from './excluir-nota/excluir-nota.component';
import { CategoriasModule } from '../categorias/categorias.module';

@NgModule({
  declarations: [
    ListarNotasComponent,
    InserirNotaComponent,
    EditarNotaComponent,
    ExcluirNotaComponent
  ],
  imports: [
    SharedModule,
    NotasRoutingModule,
    CategoriasModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [
    NotaService
  ]
})
export class NotasModule { }
