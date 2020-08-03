import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptionsComponent } from './modal-options/modal-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';import { UserService } from './user.service';
import { EdituserComponent } from './edituser/edituser.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    ModalOptionsComponent,
    EdituserComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [ModalOptionsComponent]
})
export class AppModule { }
