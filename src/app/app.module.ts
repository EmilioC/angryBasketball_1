import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { AppRoutingModule } from './app-routing.module';
import { AsistenteVirtualComponent } from './asistente-virtual/asistente-virtual.component';
import { MarketingChatComponent } from './marketing-chat/marketing-chat.component';
import { AngryBirdsGameComponent } from './angry-birds-game/angry-birds-game.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerSupportComponent,
    AsistenteVirtualComponent,
    MarketingChatComponent,
    AngryBirdsGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    GifsModule,
    CommonModule
  ],
  exports:[
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
