import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Parking } from '../models/parking';

@Injectable()
export class AdminService {
    public url: string;

    constructor( public _http: HttpClient ) {
        this.url = GLOBAL.url;
    }

    getParkings(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get( this.url + 'allParkings', { headers: headers });
    }

    editParking( parking: any ): Observable<any> {
        const params = JSON.stringify( parking );
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put( this.url + 'update-parking/' + parking._id , params, { headers: headers });
    }

    deleteParking( parkingId ): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.delete( this.url + 'delete-parking/' + parkingId, { headers: headers });
    }

    saveParking( parking: Parking ): Observable<any> {
        const params = JSON.stringify( parking );
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post( this.url + 'parkingArea', params, { headers: headers });
    }
}
