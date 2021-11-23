import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()  authorImage : string = "";
  @Input()  cite: string = "";
  @Input()  book: string = "" ;
  @Input()  author: string = "" ;
  @Input()  id: number = 0 ;
    @Input() selected: boolean= false;
    // constructor() { }
  @Output() delEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();
  @Output() toggleEvent = new EventEmitter<string>();

  constructor( ){}
  ngOnInit(): void {
  }
  sendDelReq(id: number) {
    this.delEvent.emit(id+"");
  }
  sendEditReq(id: number) {
    this.delEvent.emit(id+"");
  }
  sendToggleSelection(id:number){
    this.toggleEvent.emit(id+"");
  }
 
}
