import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaApiService, Categoria, SaveCategoriaResponse} from 'src/api/categoria-api/categoria-api.service';
import { UserApiService } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-crearcategoria',
  templateUrl: './crearcategoria.component.html',
  styleUrls: ['./crearcategoria.component.css']
})
export class CrearCategoriaComponent implements OnInit{
  userLoginOn: boolean = false;
  usuarioLogeado : any = {};
  categoria: Categoria = {
    nombre: '',
    descripcion: ''
  }

  saveCategoriaResponse: SaveCategoriaResponse = {
    mensaje: ''
  }
  formError:String="";
  router = inject(Router)
  formBuilder = inject(FormBuilder)
  createCategoriaForm = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.maxLength(25)]],
      descripcion: ['', Validators.maxLength(50)]
  })

  userApiService = inject(UserApiService);
  categoriaApiService = inject(CategoriaApiService)
  categorias: Categoria[] = []

  errorData: String="";

  ngOnInit(){
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  
    let token = this.userApiService.userToken;
    this.usuarioLogeado = this.decodificarjwt(token);
    console.log(this.usuarioLogeado);
      this.loadData();
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

  get name(){
    return this.createCategoriaForm.controls.nombre;
  }

  get descripcion(){
    return this.createCategoriaForm.controls.descripcion;
  }

  private loadData(){
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
    })
  }

  saveCategoria(){
    if(this.createCategoriaForm.valid){
      this.categorias.forEach(categoriaa =>{
        if(this.categoria.nombre == categoriaa.nombre){
          this.saveCategoriaResponse.mensaje = 'Categoria existente';
        }})
        this.categoriaApiService.saveCategoria(this.categoria).subscribe({
          next: (categoriaData) => {
            console.log(categoriaData)
          },
          error : (errorData: any) => {
            console.error(errorData);
            this.formError="Error al crear";
          },
          complete: () => {
            console.info("Creacion completada")
            this.router.navigateByUrl('/intranet');
            this.createCategoriaForm.reset();
          }
        });
    }else{
      this.createCategoriaForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    } 
  }

  tieneAcceso():boolean{
    return this.userLoginOn && this.usuarioLogeado.aud=='ADMIN';
  }
}
