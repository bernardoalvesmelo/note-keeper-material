import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Nota } from '../models/nota';
import { NotaService } from '../services/notas.service';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-excluir-nota',
  templateUrl: './excluir-nota.component.html',
  styleUrls: ['./excluir-nota.component.scss']
})
export class ExcluirNotaComponent implements OnInit{
  nota$?: Observable<Nota>;

  
  constructor (
    private notasService: NotaService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.nota$ = this.route.data.pipe(map((dados) => dados['nota']));
  }

  
  excluir(): void {
    this.route.paramMap.pipe(
      map(params => parseInt(params.get('id')!)),
      switchMap(id => this.notasService.excluir(id))
    ).subscribe({
        next: () => this.processarSucesso(),
        error: (err) => this.processarFalha(err)
      });
  }

  processarSucesso() {
    this.notificationService
      .sucesso(`Nota excluída com sucesso`);

    this.router.navigate(['/notas','listar']);
  }

  processarFalha(err: any) {
    this.notificationService
      .sucesso(`${err}`);

    console.error('Erro', err);
  }
}
