import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Categoria } from '../../categorias/models/categoria';
import { NotaService } from '../services/notas.service';
import { Nota } from '../models/nota';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-inserir-nota',
  templateUrl: './inserir-nota.component.html',
  styleUrls: ['./inserir-nota.component.scss']
})
export class InserirNotaComponent implements OnInit{
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
      map((dados) => dados['categorias'])
    )
  }

  gravar(): void {
    this.notasService.criar(this.form?.value)
      .subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err)
      })
  }

  processarSucesso(res: Nota) {
    this.notificationService
      .sucesso(`Nota ${res.titulo} cadastrada com sucesso`);

    this.router.navigate(['/notas','listar']);
  }

  processarFalha(err: any) {
    this.notificationService
      .sucesso(`${err}`);

    console.error('Erro', err);
  }
}
