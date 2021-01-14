import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/hero';

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input()hero: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
