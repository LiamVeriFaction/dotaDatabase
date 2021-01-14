import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { takeLast } from 'rxjs/operators';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit, OnChanges {
  heroList: Hero[] = [];
  visibleHeroList: Hero[] = [];
  @Input() filter;
  @Input() sortOrder;
  @Input() heroSearch;

  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroList = heroes;
      this.filterHeroes();
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnChanges(): void {
    this.filterHeroes();
    this.sortOrder === 'id'
      ? this.visibleHeroList.sort(sortByIDAsc)
      : this.visibleHeroList.sort(sortByNameAsc);
    if (this.heroSearch !== '') {
      this.visibleHeroList = this.visibleHeroList.filter((hero) => {
        return hero.name.toLocaleLowerCase().includes(this.heroSearch.toLocaleLowerCase());
      });
    }
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

function sortByNameAsc(s1: Hero, s2: Hero) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}

function sortByIDAsc(s1: Hero, s2: Hero) {
  return s1.id - s2.id;
}
