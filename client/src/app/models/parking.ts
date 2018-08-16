export class Parking {

    private _id: string;
    private parkingAreaName: string;
    private weekDaysHourlyRate: string;
    private weekendHourlyRate: string;
    private discountPercentage: string;

    constructor() {}

    public setId( id ) {
        this._id = id;
    }

    public getId() {
        return this._id;
    }

    public setParkingAreaName( parkingAreaName ) {
        this.parkingAreaName = parkingAreaName;
    }

    public getParkingAreaName() {
        return this.parkingAreaName;
    }

    public setWeekDaysHourlyRate( weekDaysHourlyRate ) {
        this.weekDaysHourlyRate = weekDaysHourlyRate;
    }

    public getWeekDaysHourlyRate() {
        return this.weekDaysHourlyRate;
    }

    public setWeekendHourlyRate( weekendHourlyRate ) {
        this.weekendHourlyRate = weekendHourlyRate;
    }

    public getWeekendHourlyRate() {
        return this.weekendHourlyRate;
    }

    public setDiscountPercentage( discountPercentage ) {
        this.discountPercentage = discountPercentage;
    }

    public getDiscountPercentage() {
        return this.discountPercentage;
    }
}
