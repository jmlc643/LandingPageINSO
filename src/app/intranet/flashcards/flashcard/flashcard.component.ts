import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  isFlashcard:  boolean = false;

  ngOnInit() {
    this.checkRouteConditions();

  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRouteConditions();
      }
    });
  
  }
  private checkRouteConditions() {
    const currentRoute = this.router.url;
    this.isFlashcard = this.router.isActive('/intranet/flashcards/ver-flashcard', false);
  }

  esRutaFlashcard(): boolean {
    return this.router.url === '/intranet/flashcards';
  }
}


  