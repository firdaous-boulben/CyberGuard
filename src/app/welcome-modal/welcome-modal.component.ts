import { Component } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrl: './welcome-modal.component.css'
})
export class WelcomeModalComponent {
  // Variables to control modal visibility
  isVisible: boolean = false;
  isLoginVisible: boolean = false;
  isSignupVisible: boolean = false;

  // Method to close the welcome modal
  openModal() {
    this.isVisible = true;
  }

  // Method to close the welcome modal
  closeModal() {
    this.isVisible = false;
  }

  // Method to open the login modal
  openLoginModal() {
    this.isVisible = false;
    this.isSignupVisible = false;
    this.isLoginVisible = true;
  }

  // Method to close the login modal
  closeLoginModal() {
    this.isLoginVisible = false;
    this.isVisible = false;
  }

  // Method to open the signup modal
  openSignupModal() {
    this.isVisible = false;
    this.isLoginVisible = false;
    this.isSignupVisible = true;
  }

  // Method to close the signup modal
  closeSignupModal() {
    this.isSignupVisible = false;
    this.isVisible = false;
  }

  eyePwdLogin = faEye;
  eyePwd = faEye;
  eyeConfirmPwd = faEye;

  hidePasswordLogin = true;
  hidePassword = true;
  hideConfirmPassword = true;

  togglePasswordLoginVisibility(): void {
    this.hidePasswordLogin = !this.hidePasswordLogin;
    this.eyePwdLogin = this.hidePasswordLogin ? faEye : faEyeSlash;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.eyePwd = this.hidePassword ? faEye : faEyeSlash;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
    this.eyeConfirmPwd = this.hideConfirmPassword ? faEye : faEyeSlash;
  }
}
