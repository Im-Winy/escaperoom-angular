import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Evenement } from '../../models/evenement/evenement.model';
import { EvenementService } from '../../services/evenement/evenement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  evenements: Evenement[] = [];

  constructor(private evenementService: EvenementService) { }

  


  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe(evenements => {
      this.evenements = evenements;
    });
  }

}
