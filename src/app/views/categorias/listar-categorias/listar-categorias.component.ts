import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Categoria } from '../models/categoria';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit{
  categorias$?: Observable<Categoria[]>;

  constructor(
    private notification: NotificationService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categorias$ =  this.route.data.pipe(
      map(res => res['categorias']));

    this.notification.sucesso('Categorias obtidas com sucesso')
  }
}
