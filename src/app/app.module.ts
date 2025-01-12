import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';  // Use HttpClientModule

import { HomepageComponent } from './homepage/homepage.component';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ThreatComponent } from './threat/threat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WelcomeModalComponent,
    ChatbotComponent,
    ThreatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule  // Keep HttpClientModule without withFetch
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
