import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CategoriaApiService, Categoria} from 'src/api/categoria-api/categoria-api.service';
import { TopicoApiService, Topico} from 'src/api/topico-api/topico-api.service';
import { UserApiService, Usuario } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, OnDestroy {
  userLoginOn:boolean=false;
  userData?:Usuario;
  user?:Usuario;
  userApiService = inject(UserApiService);

  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];
  topicos: Topico[] = [];
  filteredTopicos: Topico[] = [];

  categoriaApiService = inject(CategoriaApiService)
  topicoApiService = inject(TopicoApiService)

  ngOnDestroy(): void {
    this.userApiService.currentUserData.unsubscribe();
    this.userApiService.currentUserLoginOn.unsubscribe();
  }

  async ngOnInit(){
    await this.loadData();
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }

  filterTopicos(categoria: Categoria): Topico[] {
    return this.topicos.filter(topicoo => categoria.nombre === topicoo.categoria.nombre);
  }
  
  private async loadData() {
    this.categorias = await this.categoriaApiService.getListCategoria();
    this.topicos = await this.topicoApiService.getListTopicos();
    this.usuarios = await this.userApiService.getListUser();
  }
}