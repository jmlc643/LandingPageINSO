import { Component, OnInit, inject } from '@angular/core';
import { CategoriaApiService, Categoria} from 'src/api/categoria-api/categoria-api.service';

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

  categoriaApiService = inject(CategoriaApiService)

  async ngOnInit(){
     await this.loadData();
  }

  private async loadData() {
    this.categorias = await this.categoriaApiService.getListCategoria();
  }
}
