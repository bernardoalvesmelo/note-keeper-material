import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categorias.service';


@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.scss']
})
export class ExcluirCategoriaComponent implements OnInit {
  categoria$?: Observable<Categoria>;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.categoria$ = this.categoriaService.selecionarPorId(id);
  }

  excluirCategoria(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.categoriaService.excluir(id)
      .subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err)
      })
  }

  processarSucesso(res: Categoria) {
    this.router.navigate(['/categorias','listar']);
  }

  processarFalha(err: any) {
    console.error('Erro', err);
  }
}
