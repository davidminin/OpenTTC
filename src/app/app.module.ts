import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SearchComponent } from './search.component';
import { AppComponent } from './app.component';
import { Typeahead } from 'ng2-typeahead';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    Typeahead
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
