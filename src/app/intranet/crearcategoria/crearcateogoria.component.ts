import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  formError:String="";
  router = inject(Router)
  formBuilder = inject(FormBuilder)
  createCategoriaForm = this.formBuilder.group({
      nombre: ['',Validators.required, Validators.max(50)],
      descripcion: ['',Validators.required]
  })

  categoriaApiService = inject(CategoriaApiService)
  categorias: Categoria[] = []

  errorData: String="";

  ngOnInit(){
      this.loadData();
  }

  get name(){
    return this.createCategoriaForm.controls.nombre;
  }

  get description(){
    return this.createCategoriaForm.controls.descripcion;
  }

  private async loadData(){
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
        }
        this.categoriaApiService.saveCategoria(this.categoria).subscribe({
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
            this.createCategoriaForm.reset();
          }
        });
      })
    }
  }
}
