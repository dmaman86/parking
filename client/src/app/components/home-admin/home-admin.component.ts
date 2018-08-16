import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Parking } from '../../models/parking';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  providers: [ AdminService ]
})
export class HomeAdminComponent implements OnInit {

  public title: string;
  public count_max;
  public parkings: Parking[] = [];
  public park: Parking;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _adminService: AdminService
  ) {
    this.title = 'Parking List';
  }

  ngOnInit() {
    this._adminService.getParkings().subscribe(
      response => {
        console.log( response );
        this.count_max = response.item.count;

        console.log( response.item.parkings.length );

        for (let i = 0; i < response.item.parkings.length; i++) {
          const temp_park = response.item.parkings[i];
          console.log( temp_park);
          this.parkings[i] = new Parking();
          const array_id: any[] = temp_park.id.split('/');
          console.log( array_id );
          this.parkings[i].setId( array_id[1] );
          this.parkings[i].setParkingAreaName(temp_park.parkingAreaName);
          this.parkings[i].setWeekDaysHourlyRate(temp_park.weekDaysHourlyRate);
          this.parkings[i].setWeekendHourlyRate(temp_park.weekendHourlyRate);
          this.parkings[i].setDiscountPercentage(temp_park.discountPercentage);
        }

        console.log( 'parkings', this.parkings);
        console.log( 'count max ', this.count_max );
      }, error => {
        const errorMensage = <any>error;
        console.log(errorMensage);
        if ( errorMensage != null ) {
          this.status = 'error';
        }
      }
    );
  }

  editParking( parkingId ) {
    console.log( parkingId );
    this.park = new Parking();
    this.status = 'edit';

    for ( let i = 0; i < this.parkings.length; i++ ) {
      if ( this.parkings[i].getId() === parkingId ) {
        this.park.setId( this.parkings[i].getId() );
        this.park.setParkingAreaName( this.parkings[i].getParkingAreaName() );
        this.park.setWeekDaysHourlyRate( this.parkings[i].getWeekDaysHourlyRate() );
        this.park.setWeekendHourlyRate( this.parkings[i].getWeekendHourlyRate() );
        this.park.setDiscountPercentage( this.parkings[i].getDiscountPercentage() );
      }
    }

    console.log( this.park );
  }

  deleteParking( parkingId ) {
    this._adminService.deleteParking( parkingId ).subscribe(
      response => {
          alert( response.message );
          window.location.reload();
      }, error => {
        const errorMensage = <any>error;
        console.log( errorMensage );

        if ( errorMensage != null) {
          this.status = 'error';
        }
      }
    );
  }

  addParking() {
    this.park = new Parking();
    this.status = 'add';
  }

  onSubmit() {
    console.log( this.park );
    this._adminService.editParking( this.park ).subscribe(
      response => {
        if ( response.newParking ) {
          window.location.reload();
        }
      }, error => {
        const errorMensage = <any>error;
        console.log( errorMensage );

        if ( errorMensage != null) {
          this.status = 'error';
        }
      }
    );
  }

  uploadNewParking() {
    console.log( this.park );
    this._adminService.saveParking( this.park ).subscribe(
      response => {
        if ( response.parkingArea ) {
          window.location.reload();
        }
      }, error => {
        const errorMensage = <any>error;
        console.log( errorMensage );

        if ( errorMensage != null) {
          this.status = 'error';
        }
      }
    );
  }

}
