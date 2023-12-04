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
  usuarioLogeado : any = {};
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
      nombreT: ['',[Validators.required, Validators.maxLength(50)]],
      descripcionT: ['', Validators.maxLength(50)],
      categoria: ['', Validators.required]
  })

  ngOnInit() {
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
      this.loadData();
      let token = this.userApiService.userToken;
      this.usuarioLogeado = this.decodificarjwt(token);
  }

  get name(){
    return this.createTopicoForm.controls.nombreT;
  }

  get descripcion(){
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
            this.saveTopicoResponse.mensajeCrear = '';
            console.info("Creacion completada")
            this.router.navigateByUrl('/intranet');
            this.createTopicoForm.reset();
          }
        });       
    }else{
      this.createTopicoForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    } 
  }

  private decodificarjwt(token:String):any{
    console.log("Este es el token que he recibido "+ token);
    var base64Url = token.split('.')[1];
    console.log("Token base64url: "+ base64Url);
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log("Token base64: "+base64);
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("JSON: "+jsonPayload);
    return JSON.parse(jsonPayload);
  }

  tieneAcceso():boolean{
    console.log("Valor del userLoginOn: "+this.userLoginOn);
    return this.userLoginOn && this.usuarioLogeado.aud=='ADMIN';
  }
}
