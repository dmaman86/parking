import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Parking } from '../../models/parking';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  providers: [ UserService ]
})
export class HomeUserComponent implements OnInit {

  public days: any[];
  public parking: Parking;
  public parkings: Parking[];
  public areaName;
  public dayParking;
  public startParking;
  public endParking;
  public totalToPay;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.parkings = [];
  }

  ngOnInit() {
    this._userService.getAllParkings().subscribe(
      response => {
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
      }, error => {
        const errorMensage = <any>error;
        console.log(errorMensage);
        if ( errorMensage != null ) {
          this.status = 'error';
        }
      }
    );
  }

  searchToPay() {
    let i = 0;
    let list: HTMLElement = document.getElementById('listToPay');
    if ( list.style.display === 'block' ) {
      let lis = document.getElementById('myUL');
      console.log( lis );
      while ( lis.hasChildNodes() ) {
        lis.removeChild( lis.childNodes[i] );
      }
      list.removeChild( lis );
    } else {
      list.style.display = 'block';
    }

    list.style.height = '200px';
    list.style.width = '30%';
    list.style.marginLeft = '20px';
    let first: HTMLElement = document.createElement('UL');
    first.setAttribute( 'id', 'myUL' );
    list.appendChild( first );

    this.areaName = (<HTMLInputElement>document.getElementById('park')).value;
    this.dayParking = (<HTMLInputElement>document.getElementById('day')).value;

    // console.log( park.value, day.value );
    const listPay = [];

    for ( let j = 0; j < this.parkings.length; j++ ) {
      if ( this.parkings[j].getParkingAreaName() === this.areaName ){
        this.parking = this.parkings[j];
        console.log( this.parking );

        this.startParking = (<HTMLInputElement>document.getElementById('startParking')).value;
        this.endParking = (<HTMLInputElement>document.getElementById('endParking')).value;

        // console.log(startTime, endTime );

        listPay.push( this.areaName );
        listPay.push( this.dayParking );
        listPay.push( this.startParking );
        listPay.push( this.endParking );
      }
    }

    console.log( listPay );
    let j = 0;
    for ( ; j < listPay.length; j++) {
      const node: HTMLElement = document.createElement('LI');
      const textNode: Text = document.createTextNode( listPay[j] );
      node.appendChild( textNode );
      document.getElementById( 'myUL' ).appendChild( node );
    }

    if ( this.days.indexOf( this.dayParking ) > 1 && this.days.indexOf( this.dayParking ) < 6 ) {
      const total_time = this.devolverMinutos(this.endParking) - this.devolverMinutos(this.startParking);
      console.log(' you are in if ');
      console.log(  total_time );
      const perhour: number = parseInt( this.parking.getWeekDaysHourlyRate() );
      const befourDiscont = perhour * ( total_time / 60 );
      const totalPay = befourDiscont - ( befourDiscont * parseInt(this.parking.getDiscountPercentage()) );
      const node: HTMLElement = document.createElement('LI');
      const textNode: Text = document.createTextNode( totalPay.toString() );
      node.appendChild( textNode );
      document.getElementById( 'myUL' ).appendChild( node );
    } else {
      const total_time = this.devolverMinutos(this.endParking) - this.devolverMinutos(this.startParking);
      console.log(' you are in else ');
      console.log(  total_time );
      const perhour: number = parseInt( this.parking.getWeekendHourlyRate() );
      const befourDiscont = perhour * ( total_time / 60 );
      const totalPay = befourDiscont - ( befourDiscont * this.parking.getDiscountPercentage() );
      const node: HTMLElement = document.createElement('LI');
      const textNode: Text = document.createTextNode( totalPay.toString() );
      node.appendChild( textNode );
      document.getElementById( 'myUL' ).appendChild( node );
    }
  }

  devolverMinutos( horaMinutos ) {
    return ( parseInt ( horaMinutos.split(':')[0] ) * 60) 
          + parseInt ( horaMinutos.split(':')[1] ) ;
  }

}
