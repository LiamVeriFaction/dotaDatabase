import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  heroList: Hero[];

  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroList = heroes;
    });
  }

  ngOnInit(): void {
    this.getHeroes();

  }

  showHeroes(){
    console.log(this.heroList)
  }
}
