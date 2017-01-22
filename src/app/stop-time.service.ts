import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import {StopTime} from './stop-time';

export interface StopTimeServiceCB { (): void }

@Injectable()
export class StopTimeService {
	jsonUrl: string = './selected_stop_times.json';
	stopTimeData: StopTime[];

	constructor(private http: Http) {}

	fetchStopTimes(callback: StopTimeServiceCB) {
		this.http.get(this.jsonUrl).map(resp => resp.json()).subscribe(obj => {
			//console.log(obj);
			if(callback != null) {
				callback();
			}
		});
	}

	getStopTimesBy(stopId: number): StopTime[] {
		return this.stopTimeData.filter(st => st.stopId == stopId);
	}
}