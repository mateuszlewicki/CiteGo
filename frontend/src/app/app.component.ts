import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cite } from './model/Cite/cite';
import { ApiServiceService } from './api-service.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
	private api: ApiServiceService,
	private elem: ElementRef,
	private _clipboardService: ClipboardService,
	private primengConfig: PrimeNGConfig,
    ){ }

    public citesArr: Cite[] = [];
    public citeToggled: boolean = false;
    private tcid: string = "";
    private selectedCite: number = -1; 
    @ViewChild('fileInput')
    fileInput!: ElementRef;
    autoResize: boolean  = true;
    display: boolean = false;
    icoview!:string;
    default:string = "nazwa pliku";
    fname:string = this.default;
    cite: Cite = new Cite();
    citeSelected: Boolean = false;
    sAction: string = "add";

    ngOnInit(){
	this.primengConfig.ripple = true;
	this.fetchCites();

    }
    fetchCites(){
	this.api.getAll()
            .subscribe(
		(cites) => {this.citesArr = cites;console.log(cites);console.log(this.citesArr)}
            );
    }
    
    counter(i:number){
	return new Array(i);
    }
    deleteCite(){
	this.api.deletePost(this.selectedCite).subscribe((r)=>console.log(r+"of type "+typeof(r)+ " deleted"));
	this.fetchCites();
    }
    editCite(){
	this.openModal();
    }
    toggleSelection(id:string){
	let oEla= this.elem.nativeElement.querySelectorAll('.selectedCite');
	console.log(oEla)
	if (id != ""){
	    if (oEla.length > 0){
		oEla[0].classList.remove('selectedCite');
	    }
	    if (this.tcid != id || ! this.citeToggled){
		this.elem.nativeElement.querySelectorAll('.cite-'+id)[0].classList.toggle('selectedCite');
		this.citeToggled=true;
		this.selectedCite= Number(id);
		this.cite = this.citesArr.find(el => el.ID === this.selectedCite) || new Cite();

	    } 
	    else{
		this.citeToggled=false;
		this.selectedCite = -1;
//		this.cite = null;
	    }
	    this.tcid=id;
	    
	}
	console.log(id);
    }
    
    issueAction(action: string){
	switch(action){
	    case 'copy':
		this.copyToClipboard();
		break;
	    case 'edit':
		this.editCite();
		this.sAction = "update";
		break;
	    case 'delete':
		this.deleteCite();
		break;
	    case 'add':
		this.openModal();
		this.sAction = "add";
		break;
	}
    }
    copyToClipboard(){
	let elem = this.citesArr.find(el => el.ID == this.selectedCite);
	if (elem){
	    this._clipboardService.copyFromContent(elem.cite+"\n"+elem.authorName+" - \""+elem.book+"\"");
	}
    
    }

    sendModal(action: string){
	switch(action){
	    case "add":
		this.api.addPost(this.cite).subscribe((r) => console.log(r));
		break;
	    case "update":
		this.api.updatePost(this.cite).subscribe();
		break;
	}
	    this.closeModal();
    }
    
    openModal() {
  	this.display = true;
    }
    
    closeModal() {
  	this.display = false;
    }
    oFilExp(): void{
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
    }
}
