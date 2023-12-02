import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { VerFlashcardComponent } from './ver-flashcard/ver-flashcard.component';




const routes: Routes = [

  { path: '', component: FlashcardComponent,

},
{  path: 'ver-flashcard', component: VerFlashcardComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashcardRoutingModule{

}
