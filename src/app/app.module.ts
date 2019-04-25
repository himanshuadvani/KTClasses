import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { UserhomeComponent } from './userhome/userhome.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from "src/environments/environment";
import { ChartsModule } from 'ng2-charts';
import { PiechartComponent } from './piechart/piechart.component';
import { AdminComponent } from './admin/admin.component';
import { NonadminComponent } from './nonadmin/nonadmin.component';
import { SelectedDirective } from './selected.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent,
    ContactComponent,
    UserhomeComponent,
    PiechartComponent,
    AdminComponent,
    NonadminComponent,
    SelectedDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
