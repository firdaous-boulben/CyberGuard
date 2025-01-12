import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
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
    ThreatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // Moved to imports
    ToastrModule.forRoot({    // ✅ Proper configuration
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
