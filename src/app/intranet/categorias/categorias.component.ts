import { Component, OnInit, inject } from '@angular/core';
import { CategoriaApiService, Categoria} from 'src/api/categoria-api/categoria-api.service';
import { TopicoApiService, Topico} from 'src/api/topico-api/topico-api.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = []

  topicos: Topico[] = []
  filteredTopicos: Topico[] = [];

  categoriaApiService = inject(CategoriaApiService)
  topicoApiService = inject(TopicoApiService)

  async ngOnInit(){
    await this.loadData();
  }

  filterTopicos(categoria: Categoria): Topico[] {
    return this.topicos.filter(topicoo => categoria.nombre === topicoo.categoria.nombre);
  }
  
  private async loadData() {
    this.categorias = await this.categoriaApiService.getListCategoria();
    this.topicos = await this.topicoApiService.getListTopicos();
  }
}