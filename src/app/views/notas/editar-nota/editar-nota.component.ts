import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Categoria } from '../../categorias/models/categoria';
import { Nota } from '../models/nota';
import { NotaService } from '../services/notas.service';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.scss']
})
export class EditarNotaComponent implements OnInit{
  form?: FormGroup;
  categorias$?: Observable<Categoria[]>;

  constructor (
    private notasService: NotaService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      conteudo: [''],
      tema:['primary'],
      categoriaId: [undefined, [Validators.required]]
    });

    this.categorias$ = this.route.data.pipe(
      tap(dados => {
        this.form?.patchValue(dados['nota'])
      }),
      map((dados) => dados['categorias'] as Categoria[])
    );
  }

  gravar(): void {
    this.route.paramMap.pipe(
      map(params => parseInt(params.get('id')!)),
      switchMap(id => this.notasService.editar(id, this.form?.value))
    ).subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err)
      });
  }

  processarSucesso(res: Nota) {
    this.notificationService
      .sucesso(`Nota ${res.titulo} editada com sucesso`);

    this.router.navigate(['/notas','listar']);
  }

  processarFalha(err: any) {
    this.notificationService
      .sucesso(`${err}`);

    console.error('Erro', err);
  }
}
