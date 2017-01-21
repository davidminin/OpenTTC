import { Component } from '@angular/core';
import { Card } from './card';
import { SearchComponent } from './search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  route = CARDS;
  selectedCard: Card;

  onSelect(c: Card): void {
    this.selectedCard = c;
  } 
}

const CARDS: Card[] = [
  { name: "Stop 1", expArrival: 3.2, accuracy: 100 },
  { name: "Stop 2", expArrival: 1, accuracy: 100 },
  { name: "Stop 3", expArrival: 4, accuracy: 100 },
  { name: "Stop 4", expArrival: 15, accuracy: 100 },
  { name: "Stop 5", expArrival: 7, accuracy: 100 },
  { name: "Stop 6", expArrival: 20, accuracy: 100 },
  { name: "Stop 7", expArrival: 22, accuracy: 100 },
  { name: "Stop 8", expArrival: 2, accuracy: 100 }
];