import { Injectable } from '@angular/core';
import { Evenement } from '../../models/evenement/evenement.model';
import { Observable, of } from 'rxjs';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  // Stocke l'URL de base de l'API pour éviter la duplication
  private host = AppSettings.APP_URL;

  // Injection du service HttpClient pour faire des appels HTTP
  constructor(private http: HttpClient) { }

  // Ajoute un nouvel évènement en envoyant un formulaire de données
  public addEvenement(formData: FormData): Observable<Evenement> {
    return this.http.post<Evenement>(`${this.host}/api/auth/evenement`, formData);
  }

  public getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.host}/api/auth/evenement/list`);
  }

  public getEvenement(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.host}/api/auth/evenement/${id}`);
  }

}
