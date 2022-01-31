import { ListCountriesComponent } from './components/list-countries/list-countries.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListCountriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    DragDropModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMWNsJUp5d1ScifyyrEF6Qs_JcFNGc8Lg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
