import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-mazo',
  templateUrl: './dialog-custom.component.html',
  styleUrls: ['./dialog-custom.component.css']
})
export class DialogCustomComponent {
  router = inject(Router)

  goFlashCards(){
    this.router.navigateByUrl('/intranet/mazo')
  }
}
