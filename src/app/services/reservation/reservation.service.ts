import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeSlot } from '../../models/time-slot/time-slot.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private host = AppSettings.APP_URL;

  constructor(private http: HttpClient) { }

  public getAvailableTimeSlotsForEvent(eventId: number, selectedDate: string): Observable<TimeSlot[]> {
    const url = `${this.host}/api/auth/evenement/${eventId}/timeslots?selectedDate=${selectedDate}`;  // L'URL dépend de l'API, il faut l'ajuster
    return this.http.get<TimeSlot[]>(url);
  }
  

}
