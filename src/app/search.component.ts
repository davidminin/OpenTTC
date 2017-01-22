import { Typeahead } from 'ng2-typeahead';
import { Component } from '@angular/core';
 
@Component({
    selector: 'search-component',
    template: require('./search.component.html')
})

export class SearchComponent {
  routeName: string;
  routes: any[] = [
    {
      id: 1,
      name: "badabing",
      searchText: "badabing"
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
 
  selectedRoute: null;
 
  public routeSelected(route) {
    this.routeName = route ? route.name : 'none';
  }
 
}