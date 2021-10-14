import { CiteInterface } from '../CiteInterface/citeInterface';
export class Cite implements CiteInterface{
    ID:number;
    authorImage:string;
    authorName:string;
    cite:string;
    book:string;
    constructor()
    constructor(authorImage?: string, authorName?:string,cite?:string,book?:string){
	    this.authorName=authorName || "";
	    this.authorImage=authorImage || "";
	    this.cite=cite || "";
	    this.book=book || "";
    }
}

