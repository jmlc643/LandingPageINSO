import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { VerFlashcardComponent } from './ver-flashcard/ver-flashcard.component';
import { FlashcardRoutingModule } from './flashcards-routing.module';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    FlashcardComponent,
    VerFlashcardComponent
  ],
  imports: [
    CommonModule,
    FlashcardRoutingModule,
    FormsModule,
    RouterLink
  ]
})
export class FlashcardsModule { }
