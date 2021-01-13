import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hero } from 'src/hero';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  url: string;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    this.url = 'https://api.opendota.com/api/heroes';
    return this.http.get<Hero[]>(this.url).pipe(
      map(heroList => heroList.map(
        hero =>  this.extractHero(hero)
      ))

    );
  }
  extractHero(heroData: any): Hero {
    let hero: Hero = {
      id: heroData['id'],
      name: heroData['localized_name'],
      primary_attr: heroData['primary_attr'],
      attack_type: heroData['attack_type'],
      roles: heroData['roles'],
    };
    return hero;
  }
}
