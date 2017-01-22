import {Component} from '@angular/core';
import {Route} from './route';
import {RoutesService} from './routes.service';
import {Prediction} from './prediction';
import {PredictionService} from './prediction.service';
import {Subscription} from 'rxjs/Rx';
import {StopTimeService} from './stop-time.service';
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

  routes: Route[] = [];
  predictions: Prediction[] = [];
  selectedRoute: Route = undefined;
  currPrediction: Prediction = undefined;
  predictSubscription: Subscription;
  selectedCard: Card;

  constructor(private _routesService: RoutesService, 
    private _predictionService: PredictionService, 
    private _stopTimeService: StopTimeService) {}

  ngOnInit() {
  	this._routesService.getRoutes().subscribe(r => this.routes = r);
    this._stopTimeService.fetchStopTimes(() => {});
  }

  onRouteClicked(route: Route) {
    this.selectedRoute = route;
    console.log(this._routesService.getRoute(route.id));
    this._routesService.getRoute(route.id).subscribe(r => {
      // Set route again, but with complete info
      this.selectedRoute = r;
      if(this.predictSubscription != undefined) {
        this.predictSubscription.unsubscribe();
      }
      console.log(this.selectedRoute.id + ", " + this.selectedRoute.stops[0].id);
      this.predictSubscription = this._predictionService.getStopPredictions(this.selectedRoute.id, this.selectedRoute.stops[0].id)
        .subscribe(p => {
          this.predictions = p;
          if(this.predictions.length > 0) {
            this.currPrediction = this.predictions[0];
          } else {
            // No upcoming vehicles
            this.currPrediction = undefined;
            this.predictSubscription.unsubscribe();
          }
        });
    });

    
  }
  
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