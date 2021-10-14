import { ElementRef, EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../elem/modal';
import { Cite } from '../model/Cite/cite';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  icoview!:string;
  defalut:string = "nazwa pliku";
  fname:string = this.defalut;
  cite: Cite = new Cite();
  citeSelected: Boolean = false;

  // @Input() cid: string;
  @Output() actionEvent = new EventEmitter<string>();
  @Input() toggle: boolean;

  constructor(private modalService: ModalService, private api: ApiServiceService) {
	  //this.cite = new Cite();
	//this.cite.authorImage=" ";
   }

  ngOnInit(): void {
  }

  sendModal(id: string){
    console.log("Sending");
    // this.cite.authorImage="";
  	this.api.addPost(this.cite).subscribe((r) => console.log(r));
    console.log("Sent");
	    this.closeModal(id);
  }
  openModal(id: string) {
	this.modalService.open(id);
  }

  closeModal(id: string) {
	this.modalService.close(id);
  	this.icoview="";
	this.fname=this.defalut;
	// console.log(JSON.stringify(this.cite));
  }
  oFilExp(): void{
      // console.log("here");
      typeof(this.fileInput)
      this.fileInput.nativeElement.click();
  }
  img2base64(fileInput: any): void{
	if (fileInput.target.files && fileInput.target.files[0]) {
		const reader = new FileReader();
		reader.onload = this.rload.bind(this);

  		reader.readAsDataURL(fileInput.target.files[0]);
		//console.log(this.icoview);
		this.fname=fileInput.target.files[0].name;

	}
  }
	rload(fileLoadedEvent:any) {
		var imgSrcData = fileLoadedEvent.target.result; // <--- data: base64 
  		this.cite.authorImage=imgSrcData;

		//icoview=imgSrcData;
		}
    sendActionEvent(action:string){
      this.actionEvent.emit(action);
    }
}
