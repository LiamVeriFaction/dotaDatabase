import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTerm = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onKey(event:any){
    this.searchTerm.emit(event.target.value);
  }

}
