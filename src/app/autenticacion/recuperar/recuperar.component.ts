import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService, recuperarContraRequest } from 'src/api/user-api/user-api.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit{
  ngOnInit(): void {
    this.loadData();
  }

  private async loadData(){
    await this.userApiService.getListUser();
  }
  recuperarPass : recuperarContraRequest = {
    email: ""
  }
  userApiService = inject(UserApiService)
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  recuperarContraForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]]
  })

  get email(){
    return this.recuperarContraForm.controls.email;
  }
  formError:String="";

  recuperarContra(){
    if(this.recuperarContraForm.valid){
      this.formError="";
      this.userApiService.recuperarContra(this.recuperarPass).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData: any) => {
          console.error(errorData);
          this.formError="Credenciales invalidas";
        },
        complete: () => {
          console.info("Enviar correo completo")
          this.router.navigateByUrl('/login');
          this.recuperarContraForm.reset();
        }
      });
    }
  }
}
