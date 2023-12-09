import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Mazo, MazoApiService} from "../../../api/mazo-api/mazo-api.service";
import {FlashcardApiService, SaveFlashcardRequest} from "../../../api/flashcard-api/flashcard-api.service";
import {UserApiService} from "../../../api/user-api/user-api.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-crearflashcard',
  templateUrl: './crearflashcard.component.html',
  styleUrls: ['./crearflashcard.component.css']
})
export class CrearflashcardComponent implements OnInit{

  //Identificador para saber si esta logeado
  userLoginOn : boolean = false;

  //Objeto a modelar
  flashcard : SaveFlashcardRequest = {
    concepto : '',
    respuesta : '',
    id : 0
  }

  //Inyecciones
  activatedRoute = inject(ActivatedRoute); //Para recibir el id enrutado
  router = inject(Router);
  flashcardApiService = inject(FlashcardApiService);
  mazoApiService = inject(MazoApiService);
  userApiService = inject(UserApiService);
  formBuilder = inject(FormBuilder);

  //Mensajes
  formError: String = "";
  errorData: String = "";
  formComplete : string = '';

  //Validaciones del formulario
  createFlashCardForm = this.formBuilder.group({
    concepto: ['', [Validators.required, Validators.maxLength(30)]],
    respuesta: ['', Validators.required],
  })

  //Mazo encontrado
  mazoEncontrado? : Mazo;
  idd: number = 0;

  //Listas
  mazos: Mazo[] = []

  ngOnInit() {
    this.activatedRoute.params.subscribe(prm => {
      console.log(`El id es: ${prm['id']}`);
      this.flashcard.id = +this.activatedRoute.snapshot.params['id'];
    });
    this.userApiService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }

  get concept(){
    return this.createFlashCardForm.controls.concepto
  }

  get rpta(){
    return this.createFlashCardForm.controls.respuesta;
  }

  saveFlashcard(){
    if(this.createFlashCardForm.valid){
      this.formError = '';
      this.flashcardApiService.crearFlashCard(this.flashcard).subscribe({
        next: (flashCardData)=> {
          console.log(flashCardData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.formError = "Error al crear";
        },
        complete: () => {
          console.info("Creacion completada");
          this.formComplete = 'Flashcard creada';
          this.createFlashCardForm.reset();
          setTimeout(() => {
            this.formComplete = '';
          }, 3000);
        }
      });
    }else {
      this.createFlashCardForm.markAllAsTouched();
      alert("Error de ingreso de datos");
    }
  }

  tieneAcceso(): boolean {
    return this.userLoginOn;
  }
}
