import {Component, inject, OnInit} from '@angular/core';
import {Premio, PremioApiService, SavePremioRequest} from "../../../api/premio-api/premio-api.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UserApiService} from "../../../api/user-api/user-api.service";

@Component({
  selector: 'app-crearpremio',
  templateUrl: './crearpremio.component.html',
  styleUrls: ['./crearpremio.component.css']
})
export class CrearpremioComponent implements OnInit {

  //Identificador de usuario logeado
  userLoginOn: boolean = false;

  //Identificador de que usuario se ha logeado
  usuarioLogeado: any = {};

  //Modelo del objeto a ser creado
  premio: SavePremioRequest = {
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    username: ""
  }

  //En caso salga algun error
  formError: String = "";
  errorData: String = "";
  premioErrorResponse: String = "";

  //Inyecciones
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  userApiService = inject(UserApiService);
  premioApiService = inject(PremioApiService);

  //Validaciones del formulario
  createPremioForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(25)]],
    descripcion: ['', Validators.maxLength(50)],
    precio: ['', [Validators.required, Validators.min(0)]],
    imagen: ['', Validators.required]
  })

  //Lista de premios
  premios: Premio[] = [];

  async ngOnInit() {
    this.userApiService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    let token = this.userApiService.userToken;
    this.usuarioLogeado = this.decodificarjwt(token);
    console.log(this.usuarioLogeado);
    await this.loadData();
  }

  //Carga de la lista de premios
  private async loadData() {
    this.premios = await this.premioApiService.getListPremios();
  }

  //Para desencriptar el token
  private decodificarjwt(token: String): any {
    console.log("Este es el token que he recibido " + token);
    var base64Url = token.split('.')[1];
    console.log("Token base64url: " + base64Url);
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log("Token base64: " + base64);
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("JSON: " + jsonPayload);
    return JSON.parse(jsonPayload);
  }

  //Para acceder mas facil a los controles de la validacion del formulario
  get name() {
    return this.createPremioForm.controls.nombre;
  }

  get descripcion() {
    return this.createPremioForm.controls.descripcion;
  }

  get prize() {
    return this.createPremioForm.controls.precio;
  }

  get imagen() {
    return this.createPremioForm.controls.imagen;
  }

  //Funcion de subir premio
  savePremio() {
    if (this.createPremioForm.valid) {
      this.premios.forEach(premioo => {
        if (this.premio.nombre == premioo.nombre) {
          this.premioErrorResponse = 'Premio existente';
        }
      })
      this.premio.username = this.usuarioLogeado.sub as string;
      this.premioApiService.savePremio(this.premio).subscribe({
        next: (premioData) => {
          console.log(premioData)
        },
        error: (errorData: any) => {
          console.error(errorData);
          this.formError = "Error al crear";
        },
        complete: () => {
          console.info("Creacion completada")
          this.router.navigateByUrl('/intranet/premio');
          this.createPremioForm.reset();
        }
      });
    } else {
      this.createPremioForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }
  }

  handleImageSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const imageFile = inputElement.files[0];
      this.convertImageToBase64(imageFile, (base64String) => {
        // Aquí puedes usar la variable 'base64String' como desees
        console.log('Imagen en base64:', base64String);
        this.premio.imagen = base64String as string;
      });
    }
  }

  convertImageToBase64(file: File, callback: (base64String: string) => void) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      callback(base64String);
    };
    reader.readAsDataURL(file);
  }
  //Funcion para verificar si el usuario esta logeado y es administrador
  tieneAcceso(): boolean {
    return this.userLoginOn && this.usuarioLogeado.aud == 'ADMIN';
  }


}
