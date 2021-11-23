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
import { MenubarModule } from 'primeng/menubar';                                                                                                                                                                                                                                                                            
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ImageModule} from 'primeng/image';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DataViewModule} from 'primeng/dataview';

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
      ClipboardModule,
      MenubarModule,
      DialogModule,
      BrowserAnimationsModule,
      InputTextModule,
      InputTextareaModule,
      ImageModule,
      ButtonModule,
      CardModule,
      DataViewModule
],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
