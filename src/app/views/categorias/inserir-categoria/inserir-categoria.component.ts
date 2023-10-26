import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categorias.service';
import { Categoria } from '../models/categoria';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

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
    private notificationService: NotificationService,
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
    this.notificationService
      .sucesso(`Categoria ${res.titulo} cadastrada com sucesso`);

    this.router.navigate(['/categorias','listar']);
  }

  processarFalha(err: any) {
    this.notificationService
      .sucesso(`${err}`);

    console.error('Erro', err);
  }
}
