import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoadingComponent } from './utility/loading/loading.component';
import { VisualizationComponent } from './visualization/visualization/visualization.component';
import { MaterialPickerComponent } from './visualization/material-picker/material-picker.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    VisualizationComponent,
    MaterialPickerComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
