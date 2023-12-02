import { Component, OnInit, inject } from '@angular/core';
import { CategoriaApiService, Categoria, SaveCategoriaResponse} from 'src/api/categoria-api/categoria-api.service';

@Component({
  selector: 'app-crearcategoria',
  templateUrl: './crearcategoria.component.html',
  styleUrls: ['./crearcategoria.component.css']
})
export class CrearCategoriaComponent implements OnInit{
  categoria: Categoria = {
    nombre: '',
    descripcion: ''
  }

  saveCategoriaResponse: SaveCategoriaResponse = {
    mensaje: ''
  }

  categoriaApiService = inject(CategoriaApiService)
  categorias: Categoria[] = []

  async ngOnInit(){
      await this.loadData();
  }

  private async loadData(){
    await this.categoriaApiService.getListCategoria();
  }

  saveCategoria(){
    this.categorias.forEach(categoriaa =>{
      if(this.categoria.nombre == categoriaa.nombre){
        this.saveCategoriaResponse.mensaje = 'Categoria existente';
      }
      this.categoriaApiService.saveCategoria(this.categoria);
    })
  }
}
