import { Component, ViewChild } from '@angular/core';
import { faClock, faShieldAlt, faEye, faChartLine, faExclamationTriangle, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { WelcomeModalComponent } from '../welcome-modal/welcome-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']  // Corrected to styleUrls with plural
})
export class HomepageComponent {
  faClock = faClock;
  faShieldAlt = faShieldAlt;
  faEye = faEye;
  faChartLine = faChartLine;
  faUserCog = faUserCog;
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
