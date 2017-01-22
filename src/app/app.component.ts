import {Component} from '@angular/core';
import {Route} from './route';
import {RoutesService} from './routes.service';
import {Prediction} from './prediction';
import {PredictionService} from './prediction.service';
import {Subscription} from 'rxjs/Rx';
import {StopTimeService} from './stop-time.service';
import { Card } from './card';
import { SearchComponent } from './search.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  routes: Route[] = [];
  predictions: Prediction[] = [];
  selectedRoute: Route = undefined;
  currPrediction: Prediction = undefined;
  predictSubscription: Subscription;
  route = CARDS;
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