import { Evenement } from "../evenement/evenement.model";

export interface Reservation {
  idReservation: number;
  dateReservation: string;
  montant: number;
  montantHT: number;
  montantTVA: number;
  evenement: Evenement;
}