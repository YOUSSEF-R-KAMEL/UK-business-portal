import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  groups: string[] = [
    'TheStreet',
    'BBC News',
    'ZDNet',
    'Bloomberg',
    'Financial Times',
    'CNN',
    'AMBCrypto'
  ];
}
