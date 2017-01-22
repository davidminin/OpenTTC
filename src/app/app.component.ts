import { Component } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  route = STOPS;
  buses = BUSROUTES;
  selected = BUSROUTES[0];
  current = BUSROUTES[0];

  onSelect(s: any): void {
    this.current = s;
  } 

  search() {
    this.current = this.selected;
  }
}

const STOPS: Card[] = [
  { name: "Downsview Station", code: "#3428", expArrival: 3, accuracy: 100 },
  { name: "Stop 2", code: "#3439", expArrival: 1, accuracy: 100 },
  { name: "Stop 3", code: "#3552", expArrival: 4, accuracy: 100 },
  { name: "Stop 4", code: "#3663", expArrival: 15, accuracy: 100 },
  { name: "Stop 5", code: "#3719", expArrival: 7, accuracy: 100 },
  { name: "Stop 6", code: "#3820", expArrival: 20, accuracy: 100 },
  { name: "Stop 7", code: "#3976", expArrival: 22, accuracy: 100 },
  { name: "Stop 8", code: "#4113", expArrival: 2, accuracy: 100 }
];

const BUSROUTES: any[] = [
    {
      id: 1,
      name: "105A - Dufferin North",
      searchText: "105A - Dufferin North",
      code: "105A"
    },
    {
      id: 2,
      name: "105A - Dufferin South",
      searchText: "105A - Dufferin South",
      code: "105A"
    },
    {
      id: 3,
      name: "005 - King West",
      searchText: "005 - King West",
      code: "005"
    }
];