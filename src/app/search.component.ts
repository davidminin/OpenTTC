import { Typeahead } from 'ng2-typeahead';
import { Component } from '@angular/core';
 
@Component({
    selector: 'search-component',
    template: require('./search.component.html'),
    styles: [`
        .typeahead-input,
        .typeahead-typeahead{
            width: 250px;
            padding: 8px;
            border-radius: 5px;
        }
    `]
})
export class SearchComponent {
 
  fruitName: string;
  fruits: any[] = [
    {
      id: 1,
      name: "Apple",
      searchText: "apple"
    },
    {
      id: 2,
      name: "Orange",
      searchText: "orange"
    },
    {
      id: 3,
      name: "Banana",
      searchText: "banana"
    }
  ];
 
  selectedFruit: any = this.fruits[0];
 
  public fruitSelected(fruit) {
    this.fruitName = fruit ? fruit.name : 'none';
  }
 
}