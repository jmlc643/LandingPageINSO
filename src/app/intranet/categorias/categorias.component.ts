import { Component, OnInit, inject } from '@angular/core';
import { CategoriaApiService, Categoria} from 'src/api/categoria-api/categoria-api.service';
import { TopicoApiService, Topico, SaveTopicoRequest} from 'src/api/topico-api/topico-api.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categoria: Categoria = {
    nombre: '',
    descripcion: ''
  }

  categorias: Categoria[] = []

  guardartopico: SaveTopicoRequest = {
    nombre: '',
    descripcion: '',
    nombreCategoria: ''
  }

  topico: Topico = {
    nombre: '',
    descripcion: '',
    categoriaUnida: {
      nombre : '',
      descripcion : ''
    }
  }

  topicos: Topico[] = []

  categoriaApiService = inject(CategoriaApiService)

  async ngOnInit(){
    await this.loadDataCategoria();
  }

  private async loadDataCategoria() {
    this.categorias = await this.categoriaApiService.getListCategoria();
  }

}