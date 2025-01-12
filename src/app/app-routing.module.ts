import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ThreatComponent } from './threat/threat.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cyberguard', component: ChatbotComponent },
  { path: 'threat-scan', component: ThreatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
