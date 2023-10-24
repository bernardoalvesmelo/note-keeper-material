import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categorias.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent {
  form?: FormGroup;
  categoria$?: Observable<Categoria>;

  constructor(
    private fb: FormBuilder, 
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [''],
    });

    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.categoria$ = this.categoriaService.selecionarPorId(id);
    
    this.categoria$ .subscribe({
      next: (res) => this.form?.patchValue(res),
      error: (err) => this.processarFalha(err)
    });
  }

  gravar(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.categoriaService.editar(id, this.form?.value)
      .subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err)
      });
  }

  processarSucesso(res: Categoria) {
    this.router.navigate(['/categorias','listar']);
  }

  processarFalha(err: any) {
    console.error('Erro', err);
  }
}
