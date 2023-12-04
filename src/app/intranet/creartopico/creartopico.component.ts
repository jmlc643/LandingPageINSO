import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria, CategoriaApiService } from 'src/api/categoria-api/categoria-api.service';
import { TopicoApiService, Topico, SaveTopicoRequest, saveTopicoResponse} from 'src/api/topico-api/topico-api.service';
import { UserApiService, Usuario } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-creartopico',
  templateUrl: './creartopico.component.html',
  styleUrls: ['./creartopico.component.css']
})
export class CrearTopicoComponent implements OnInit{
  userLoginOn:boolean=false;
  userData?:String;
  user?:Usuario;
  userApiService = inject(UserApiService);
  errorData:String="";
  topico: SaveTopicoRequest = {
    nombre : '',
    descripcion : '',
    nombreCategoria : ''
  }

  saveTopicoResponse : saveTopicoResponse = {
    mensajeCrear : '',
    mensajeNulo : ''
  }

  topicoApiService = inject(TopicoApiService)
  categoriaApiService = inject(CategoriaApiService)

  topicos : Topico[] = []
  categorias?: Categoria[] = [];

  formError:String="";
  router = inject(Router)
  formBuilder = inject(FormBuilder)
  createTopicoForm = this.formBuilder.group({
      nombreT: ['',Validators.required],
      descripcionT: ['',Validators.required],
      categoria: ['', Validators.required]
  })

  ngOnInit() {
      this.loadData();
  }

  get name(){
    return this.createTopicoForm.controls.nombreT;
  }

  get description(){
    return this.createTopicoForm.controls.descripcionT;
  }

  get categoria(){
    return this.createTopicoForm.controls.categoria;
  }

  private loadData(){
    this.topicoApiService.getListTopicos().subscribe({
      next: (topicoData)=>{
        this.topicos = topicoData;
      },
      error: (errorData) => {
        this.errorData = errorData;
      },
      complete: () =>{
        console.info("Data obtenida")
      }
    });
    this.categoriaApiService.getListCategoria().subscribe({
      next: (categoriaData)=>{
        this.categorias = categoriaData;
      },
      error: (errorData) => {
        this.errorData = errorData;
      },
      complete: () =>{
        console.info("Data obtenida")
      }
    });
  }

  saveTopico(){
    if(this.createTopicoForm.valid){
      this.topicos.forEach(topicoo =>{
        if(this.topico.nombre == topicoo.nombre){
          this.saveTopicoResponse.mensajeCrear = 'Topico existente';
        }
      }) 
        this.topicoApiService.crearTopico(this.topico).subscribe({
          next: (userData) => {
            console.log(userData)
          },
          error : (errorData: any) => {
            console.error(errorData);
            this.formError="Error al crear";
          },
          complete: () => {
            console.info("Creacion completada")
            this.router.navigateByUrl('/intranet');
            this.createTopicoForm.reset();
          }
        }); 
        this.saveTopicoResponse.mensajeCrear = '';
        this.saveTopicoResponse.mensajeNulo = '';
    }
  }
}
