import { Component, OnInit, inject } from '@angular/core';
import { CategoriaApiService, Categoria} from 'src/api/categoria-api/categoria-api.service';
import { TopicoApiService, Topico} from 'src/api/topico-api/topico-api.service';
import { UserApiService, Usuario } from 'src/api/user-api/user-api.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  userLoginOn:boolean=false;
  userData?:String;
  user?:Usuario;
  userApiService = inject(UserApiService);
  constructor(){
    
  }

  encryptionKey:String = "Secret";

  categorias: Categoria[] = [];
  topicos: Topico[] = [];
  filteredTopicos: Topico[] = [];

  categoriaApiService = inject(CategoriaApiService)
  topicoApiService = inject(TopicoApiService)

  async ngOnInit(){
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    this.userApiService.currentUserData.subscribe({
      next:(userData) => {
        this.userData = userData;
        console.log("Este es el token que estoy enviando: "+userData);
      }
    })
    await this.loadData();
  }

  filterTopicos(categoria: Categoria): Topico[] {
    return this.topicos.filter(topicoo => categoria.nombre === topicoo.categoria.nombre);
  }
  
  private async loadData() {
    this.categoriaApiService.getListCategoria().subscribe((data)=>{
      this.categorias = data;
    });
    this.topicos = await this.topicoApiService.getListTopicos();
    this.userApiService.getListUser();
  }

  
}