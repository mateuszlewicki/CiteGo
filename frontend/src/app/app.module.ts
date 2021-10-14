import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { CardComponent } from './elem/card/card.component';
import { ModalComponent } from './elem/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    CardComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
