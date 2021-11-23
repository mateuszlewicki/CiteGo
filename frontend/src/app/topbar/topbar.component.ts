import { ElementRef, EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    constructor(
    ) {}
    
    items: MenuItem[] = [];

    @Output() actionEvent = new EventEmitter<string>();
    @Input()
    set toggle(val: boolean){
	if (val){
	    this.items = [
		{
		    label: "Dodaj",
		    icon: "pi pi-plus",
		    command: () => {this.sendActionEvent("add");}
		},
		{
		    label: "Kopiuj",
		    icon: "pi pi-copy",
    		    command: () => {this.sendActionEvent("copy");}
		},
		{
		    label: "Edytuj",
		    icon: "pi pi-pencil",
		    command: () => {this.sendActionEvent("edit");}
		},
		{
		    label:"Usuń",
		    icon: "pi pi-trash",
		    command: () => {this.sendActionEvent("delete");}
		}
	    ];
	}
	else{
	    this.items = [
		{
		    label: "Dodaj",
		    icon: "pi pi-plus",
		    command: () => {this.sendActionEvent("add");}

		},
		{
		    label: "Kopiuj",
		    icon: "pi pi-copy",
		    disabled: true
		},
		{
		    label: "Edytuj",
		    icon: "pi pi-pencil",
		    disabled: true
		},
		{
		    label:"Usuń",
		    icon: "pi pi-trash",
		    disabled: true
		}
	    ];
	}
    };


    
    ngOnInit(): void {
	this.items = [
	    {
		label: "Dodaj",
		icon: "pi pi-plus",
		command: () => {this.sendActionEvent("add");}
	    },
	    {
		label: "Kopiuj",
		icon: "pi pi-copy",
		disabled: true
	    },
	    {
		label: "Edytuj",
		icon: "pi pi-pencil",
		disabled: true
	    },
	    {
		label:"Usuń",
		icon: "pi pi-trash",
		disabled: true
	    }
	];
    }
    


    sendActionEvent(action:string){
	this.actionEvent.emit(action);
    }
}
