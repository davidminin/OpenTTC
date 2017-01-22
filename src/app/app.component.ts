import {Component} from '@angular/core';
import {Route} from './route';
import {RoutesService} from './routes.service';
import {Prediction} from './prediction';
import {PredictionService} from './prediction.service';
import {Subscription} from 'rxjs/Rx';
import {StopTimeService} from './stop-time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  routes: Route[] = [];
  predictions: Prediction[] = [];
  selectedRoute: Route = undefined;
  currPrediction: Prediction = undefined;
  predictSubscription: Subscription;

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
}
