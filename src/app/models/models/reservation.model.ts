import { TimeSlot } from "../time-slot/time-slot.model";

export class Reservation {
    id: number;
    timeSlot: TimeSlot;
    user: any;
    event: any;

    constructor() {
        this.id = 0;
        this.timeSlot = new TimeSlot();
        this.user = null;
        this.event = null;
    }
}

