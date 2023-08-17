import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarModule } from 'src/app/shared/ui/tool-bar.module';


import { HttpClientModule } from '@angular/common/http';
import { SearchListComponent } from './search-list/search-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';




@NgModule({
  declarations: [
    AppComponent,
    SearchListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolBarModule,
    BrowserAnimationsModule,
    HttpClientModule,


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideStore()],
  bootstrap: [AppComponent]
})
export class AppModule { }
