import { Component, ViewChild } from '@angular/core';
import { 
  faClock, // 24/7 Availability
  faShieldAlt, // Incident Response Support
  faEye, // Real-Time Threat Detection
  faChartLine, // Predictive Threat Analysis
  faEnvelopeOpen, // Phishing Detection
  faExclamationTriangle // Vulnerability Assessment
} from '@fortawesome/free-solid-svg-icons';
import { WelcomeModalComponent } from '../welcome-modal/welcome-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  faClock = faClock;
  faShieldAlt = faShieldAlt;
  faEye = faEye;
  faChartLine = faChartLine;
  faEnvelopeOpen = faEnvelopeOpen;
  faExclamationTriangle = faExclamationTriangle;

  @ViewChild('welcomeModal') welcomeModal!: WelcomeModalComponent;

  openWelcomeModal() {
      this.welcomeModal.openModal();
  }

  openLoginModal() {
    this.welcomeModal.openLoginModal();
  }

  openSignupModal() {
    this.welcomeModal.openSignupModal();
  }
}
