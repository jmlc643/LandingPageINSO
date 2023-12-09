import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogCustomComponent} from "../../app/layout/dialog-mazo/dialog-custom.component";

@Injectable({
  providedIn: 'root'
})
export class DialogApiService {

  matDialog = inject(MatDialog)

  openDialogCustom(){
    this.matDialog.open(DialogCustomComponent);
  }
}
