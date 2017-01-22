import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import {StopTime} from './stop-time';

export interface StopTimeServiceCB { (): void }

@Injectable()
export class StopTimeService {
	jsonUrl: string = './selected_stop_times.json';
	stopTimeData: StopTime[] = [];
	initialized: boolean = false;

	constructor(private http: Http) {}

	fetchStopTimes(callback: StopTimeServiceCB) {
		if(!this.initialized) {
			this.http.get(this.jsonUrl).map(resp => resp.json()).subscribe(data => {
				//data.forEach(val => console.log(val));
				
				for (let key in data) {
					let stopTime: StopTime = new StopTime();
					stopTime.stopId = Number(key);
					stopTime.arrivalTimes = [];
					let value = data[key];
					//console.log(value);
					for(let index in value) {
						let stop = value[index];
						stopTime.arrivalTimes.push(stop.arrival_time);
						//console.log(stop.arrival_time);
					}
					this.stopTimeData.push(stopTime);
				}

				//console.log(this.stopTimeData);
				this.initialized = true;
				if(callback != null) {
					callback();
				}
			});
		}
	}

	getStopTimesById(stopId: number): StopTime {
		return this.initialized ? this.stopTimeData.find(val => {
			//console.log(val);
			return val.stopId == stopId;
		}) : null;
	}

	getNextArrivalTime(stopId: number): Date {
		if(this.initialized) {
			//console.log("pass1");
			let stopTime = this.getStopTimesById(stopId);
			//console.log(stopTime);
			if(stopTime != null) {
				let d: Date = new Date();
				//console.log(d);
				//console.log("" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
				for(let i = 0; i < stopTime.arrivalTimes.length; i++) {
					let split = stopTime.arrivalTimes[i].split(':');
					//console.log("Hour: " + split[0] + " vs. " + d.getHours());
					if(Number(split[0]) < d.getHours()) {
						continue;
					}
					//console.log("Minute: " + split[1] + " vs. " + d.getMinutes());
					if(Number(split[0]) == d.getHours() && Number(split[1]) < d.getMinutes()) {
						continue;
					}
							//console.log("Second: " + split[2] + " vs. " + d.getSeconds());
					if(Number(split[1]) == d.getMinutes() && Number(split[2]) < d.getSeconds()) {
						continue;
					}

					// If reached this point, time is valid
					//console.log(d.getDate())
					return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 
						Number(split[0]), Number(split[1]), Number(split[2]));
				}
			}

		}
		return null;
	}
}