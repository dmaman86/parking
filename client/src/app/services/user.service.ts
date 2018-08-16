import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Parking } from '../models/parking';

@Injectable()
export class UserService {

    public url: string;

    constructor( public _http: HttpClient ) {
        this.url = GLOBAL.url;
    }

    getAllParkings(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get( this.url + 'allParkings', { headers: headers });
    }

    getParking( parkingId ): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get( this.url + 'parking/' + parkingId, { headers: headers });
    }
}
