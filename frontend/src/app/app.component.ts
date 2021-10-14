import { Component, ElementRef } from '@angular/core';
import { Cite } from './model/Cite/cite';
import { ApiServiceService } from './api-service.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  citesArr: Cite[];
  title = 'frontend';
  error:string="";
  count = 6;
  citeToggled: boolean = false;
  tcid: string;

      constructor(private api: ApiServiceService,private elem: ElementRef,private _clipboardService: ClipboardService){ }
      ngOnInit(){
      //  this.cites$ = 
       this.api.getAll()
        .subscribe(
          (cites) => {this.citesArr = cites;console.log(cites);console.log(this.citesArr)}
        );
        // this.api.getAll().subscribe((data: any[])=>{
        //   console.log(data);
        // })
        // console.log(this.cites$);
     
      }
  counter(i:number){
    return new Array(i);
  }
  deleteCite(event: string){
    this.api.deletePost(event).subscribe((r)=>console.log(event+"of type "+typeof(event)+ " deleted"));
  }
  editCite(event:string){

  }
  toggleSelection(id:string){
    let oEla= this.elem.nativeElement.querySelectorAll('.selectedCite');
    console.log(oEla)
    if (id != ""){
      if (oEla.length > 0){
        oEla[0].classList.remove('selectedCite');
      }
      if (this.tcid != id || ! this.citeToggled){
        this.elem.nativeElement.querySelectorAll('.cite-'+id)[0].classList.add('selectedCite');
        this.citeToggled=true;
      }  // elem.classList.add('selectedCite')
      else{
        this.citeToggled=false;
      }
      this.tcid=id;
  }
    console.log(id);
  }

  issueAction(action: string){
    switch(action){
      case 'copy':
        this.copyToClipboard(Number(this.tcid));
        break;
    }
  }
  copyToClipboard(id: number){
    // this.clipboard.copy();
    let elem = this.citesArr.find(el => el.ID == id)
    if (elem){
      this._clipboardService.copyFromContent(elem.cite);
    }


    
    // console.log()
    
  }
}
