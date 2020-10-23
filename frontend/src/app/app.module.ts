import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AstComponent } from './components/ast/ast.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    AstComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
