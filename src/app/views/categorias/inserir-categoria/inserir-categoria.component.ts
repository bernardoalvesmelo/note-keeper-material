import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categorias.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.scss']
})
export class InserirCategoriaComponent implements OnInit{
  form?: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private categoriasService: CategoriaService, 
    private router: Router) {}
 
  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [''],
    });
  }

  gravar(): void {
    this.categoriasService.criar(this.form?.value)
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
