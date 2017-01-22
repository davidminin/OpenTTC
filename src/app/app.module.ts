import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SearchComponent } from './search.component';
import { AppComponent } from './app.component';
import { RoutesService } from './routes.service';
import { PredictionService } from './prediction.service';
import { StopTimeService } from './stop-time.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RoutesService, PredictionService, StopTimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
