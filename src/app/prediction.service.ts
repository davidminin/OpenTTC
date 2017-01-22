import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {API_BASE_URL} from './config';
import {Prediction, PredictionStopMap} from './prediction';

import 'rxjs/add/operator/map';

@Injectable()
export class PredictionService {
  isRunning: boolean = false;
  obser: Observable<any> = undefined;
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

    getAllStopPredictions(routeId: number, stopIds: number[]): Observable<PredictionStopMap> {
      let query:string = "";
      stopIds.forEach(val => query += routeId + ":" + val + ",");
      query = query.replace(/,\s*$/, "");
      console.log(query);

      this.obser = Observable.timer(0, 10000) 
        .switchMap(() => this.http.get('http://restbus.info/api/agencies/ttc/tuples/' + query + '/predictions'))
        .map(extractPredictMapData);

      return this.obser;
    }
}

function extractPredictMapData(resp: Response): PredictionStopMap {
  let data = resp.json();
  let predictMap: PredictionStopMap = {};
  for(let i = 0; i < data.length; i++) {
    predictMap[data[i].stop.id] = data[i].values.map(toPrediction);
    console.log(data[i].stop.id + ": " + predictMap[data[i].stop.id]);
  }
  return predictMap;
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