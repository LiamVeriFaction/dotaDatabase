import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  filter : string = 'all';
  sortBy: string ='id';
  heroSearch: string ='';


  newSearch(event:string){
    this.heroSearch = event;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
