import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {API_BASE_URL} from './config';
import {Prediction} from './prediction';

import 'rxjs/add/operator/map';

@Injectable()
export class PredictionService {
  isRunning: boolean = false;
  obser: Observable<Prediction[]> = undefined;
  stopId: number = 0;

	constructor(private http:Http) { }
  	
  	getStopPredictions(routeId: number, stopId: number): Observable<Prediction[]> {
      if(stopId != this.stopId) {
        this.obser = undefined;
        this.stopId = stopId;
      }

      if(this.obser == undefined) {
  		this.obser = Observable.timer(0, 5000) 
        .switchMap(() => this.http.get('http://restbus.info/api/agencies/ttc/routes/' + routeId + '/stops/' + stopId + '/predictions'))
        .map(extractPredictData);
      }

      return this.obser;
  	}

    getAllStopPredictions(routeId: number, stopIds: number[]) {
      let query:string = "";
      stopIds.forEach(val => query += routeId + ":" + val + ",");
      console.log(query);

      // this.obser = Observable.timer(0, 5000) 
      //   .switchMap(() => this.http.get('http://restbus.info/api/agencies/ttc/routes/' + routeId + '/stops/' + stopId + '/predictions'))
      //   .map(extractPredictData);
    }
}

function extractPredictData(resp: Response): Prediction[] {
  return resp.json().length > 0 ? resp.json()[0].values.map(toPrediction) : [];
}

function toPrediction(p: any): Prediction {
	return <Prediction>({
    epochTime: p.epochTime,
    seconds: p.seconds,
    minutes: p.minutes,
    branch: p.branch,
    vehicleId: p.vehicle.id
  });

}