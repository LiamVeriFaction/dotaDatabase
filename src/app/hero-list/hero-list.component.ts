import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit, OnChanges {
  heroList: Hero[] = [];
  visibleHeroList: Hero[] =[];
  @Input() filter;

  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroList = heroes;
      this.filterHeroes()
    });
  }

  ngOnInit(): void {
    this.getHeroes();

  }

  ngOnChanges(): void {
    this.filterHeroes();
  }

  filterHeroes() {
    if (this.filter == 'all') {
      this.visibleHeroList = this.heroList.slice(0);
    } else {
      this.visibleHeroList = this.heroList.filter((hero) => {
        return hero.primary_attr.toLocaleLowerCase() === this.filter;
      });
    }
  }
}
