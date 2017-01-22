import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {API_BASE_URL} from './config';
import {Route} from './route';

import 'rxjs/add/operator/map';

@Injectable()
export class RoutesService {
  routesObserver: Observable<Route[]> = null;
	constructor(private http:Http) { }
  	
  	getRoutes(): Observable<Route[]> {
      if(this.routesObserver == null) {
  		this.routesObserver = this.http.get('http://restbus.info/api/agencies/ttc/routes')
        .map(mapRouteResp);
      }

      return this.routesObserver;
  	}

  	getRoute(id: number) {
  		return this.http.get('http://restbus.info/api/agencies/ttc/routes/' + id).map(singleRouteMap);
  	}
}

function mapRouteResp(resp: Response): Route[] {
	return resp.json().map(toRoute);
}

function singleRouteMap(resp: Response): Route {
  return toRoute(resp.json());
}

function toRoute(r: any): Route {
  //console.log(r);
	return <Route>({
		id: r.id,
		title: r.title,
		stops: r.stops
	});
}