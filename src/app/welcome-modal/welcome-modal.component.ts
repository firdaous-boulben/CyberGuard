import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrl: './welcome-modal.component.css'
})
export class WelcomeModalComponent implements OnInit {
  // Modal visibility controls
  isVisible = false;
  isLoginVisible = false;
  isSignupVisible = false;

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

  // Icons for toggling password visibility
  eyePwdLogin = faEye;
  eyePwd = faEye;
  eyeConfirmPwd = faEye;

  hidePasswordLogin = true;
  hidePassword = true;
  hideConfirmPassword = true;

  // Forms
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize forms with stricter validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator]],
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator for strong passwords
  strongPasswordValidator(control: AbstractControl) {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const hasMinLength = value.length >= 8;

    if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar || !hasMinLength) {
      return { weakPassword: true };
    }
    return null;
  }

  // Custom validator for password matching
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Password visibility toggles
  togglePasswordLoginVisibility() {
    this.hidePasswordLogin = !this.hidePasswordLogin;
    this.eyePwdLogin = this.hidePasswordLogin ? faEye : faEyeSlash;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
    this.eyePwd = this.hidePassword ? faEye : faEyeSlash;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
    this.eyeConfirmPwd = this.hideConfirmPassword ? faEye : faEyeSlash;
  }

  // Form submission methods
  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
    } else {
      console.log('Login form is invalid');
    }
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup data:', this.signupForm.value);
    } else {
      console.log('Signup form is invalid');
    }
  }
}