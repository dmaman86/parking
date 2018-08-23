export class NewParking {

    private _id: string;
    private parkingAreaName: string;
    private weekDaysHourlyRate: string;
    private weekendHourlyRate: string;
    private discountPercentage: string;

    constructor(id: string,
             parkingAreaName: string,
             weekDaysHourlyRate: string,
             weekendHourlyRate: string,
             discountPercentage: string) {
        this._id = id;
        this.parkingAreaName = parkingAreaName;
        this.weekDaysHourlyRate = weekDaysHourlyRate;
        this.weekendHourlyRate = weekendHourlyRate;
        this.discountPercentage = discountPercentage;
    }

    public setID( id: string) {
        this._id = id;
    }

    public getID() {
        return this._id;
    }

    public setParkingAreaName( parkingAreaName: string) {
        this.parkingAreaName = parkingAreaName;
    }

    public getParkingAreaName() {
        return this.parkingAreaName;
    }

    public setWeekDaysHourlyRate( weekDaysHourlyRate: string) {
        this.weekDaysHourlyRate = weekDaysHourlyRate;
    }

    public getWeekDaysHourlyRate() {
        return this.weekDaysHourlyRate;
    }

    public setWeekendHourlyRate( weekendHourlyRate: string ) {
        this.weekendHourlyRate = weekendHourlyRate;
    }

    public getWeekendHourlyRate() {
        return this.weekendHourlyRate;
    }

    public setDiscountPercentage( discountPercentage: string ) {
        this.discountPercentage = discountPercentage;
    }

    public getDiscountPercentage() {
        return this.discountPercentage;
    }
}
