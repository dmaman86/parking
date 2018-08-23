import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NewParking } from '../../models/newParking';
import { ToPay } from '../../models/toPay';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  providers: [ UserService ]
})
export class HomeUserComponent implements OnInit {

  public days: any[];
  public parking: NewParking;
  public parkings: NewParking[];
  public areaName;
  public dayParking;
  public startParking;
  public endParking;
  public totalToPay;
  public status: string;
  public toPay: ToPay;
  public time;
  public id;
  public discount;
  public mount;

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
          const array_id: any[] = temp_park.id.split('/');
          console.log( array_id );
          this.parkings[i] = new NewParking(
            array_id[1], temp_park.parkingAreaName, temp_park.weekDaysHourlyRate, temp_park.weekendHourlyRate, temp_park.discountPercentage
          );
        }

        console.log( this.parkings );
      }, error => {
        const errorMensage = <any>error;
        console.log(errorMensage);
        if ( errorMensage != null ) {
          this.status = 'error';
        }
      }
    );
  }

  searchToPay(  ) {
    this.status = 'pay';
    this.areaName = (<HTMLInputElement>document.getElementById('park')).value;
    console.log( this.areaName );

    for ( let j = 0; j < this.parkings.length; j++ ) {
      if ( this.parkings[j].getParkingAreaName() === this.areaName ) {
        this.id = this.parkings[j].getID();
        this.startParking = (<HTMLInputElement>document.getElementById('startParking')).value;
        this.endParking = (<HTMLInputElement>document.getElementById('endParking')).value;
        this.dayParking = (<HTMLInputElement>document.getElementById('day')).value;
        if (  this.days.indexOf( this.dayParking ) > 1 && this.days.indexOf( this.dayParking ) < 6) {
          this.mount = this.parkings[j].getWeekDaysHourlyRate();
        } else {
          this.mount = this.parkings[j].getWeekendHourlyRate();
        }
        this.discount = this.parkings[j].getDiscountPercentage();
      }
    }

    if ( this.endParking > this.startParking ) {
      this.time = this.timeStringToFloat(this.endParking) - this.timeStringToFloat(this.startParking);
    } else {
      alert('check again the time');
      this.status = '';
    }

    console.log( this.time * this.mount );
    const befourDiscont = this.time * this.mount;

    this.totalToPay = befourDiscont - ( befourDiscont * this.discount );

    console.log( this.totalToPay );

    console.log( this.mount, this.id, this.discount );
    this.toPay = new ToPay(this.areaName, this.dayParking, this.startParking, this.endParking, this.totalToPay);
  }

  timeStringToFloat(time) {
    const hoursMinutes = time.split(/[.:]/);
    const hours = parseInt(hoursMinutes[0], 10);
    const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

}
