import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot } from "@angular/router";
import { Categoria } from "../models/categoria";
import { CategoriaService } from "./categorias.service";

export const listarCategoriasResolver: ResolveFn<Categoria[]> = () => {
  return inject(CategoriaService).selecionarTodos();
};