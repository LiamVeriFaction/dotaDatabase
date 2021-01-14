import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hero } from 'src/hero';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  url: string;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    this.url = 'https://api.opendota.com/api/heroes';
    return this.http
      .get<Hero[]>(this.url)
      .pipe(
        map((heroList) =>
          heroList.map((hero) => this.extractHero(<APIHero>(<unknown>hero)))
        )
      );
  }

  getHero(id: number): Observable<Hero> {
    this.url = 'https://api.opendota.com/api/heroes';
    return this.http.get<Hero[]>(this.url).pipe(
      map((heroList) =>
        heroList.map((hero) => this.extractHero(<APIHero>(<unknown>hero)))
      ),
      map((heroList: Hero[]) =>
        heroList.find((hero: Hero) => {
          return hero.id === id;
        })
      )
    );
  }

  extractHero(heroData: APIHero): Hero {
    let hero: Hero = {
      id: heroData.id,
      name: heroData.localized_name,
      primary_attr: heroData.primary_attr,
      attack_type: heroData.attack_type,
      roles: heroData.roles,
      iconPath:
        '../assets/images/heroes/' +
        heroData.localized_name.toLocaleLowerCase() +
        '.png',
    };
    //console.log(hero)
    return hero;
  }
}

export interface APIHero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
}
