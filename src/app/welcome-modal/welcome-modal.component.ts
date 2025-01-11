import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.css']
})
export class WelcomeModalComponent implements OnInit {
  // Modal visibility controls
  isVisible = false;
  isLoginVisible = false;
  isSignupVisible = false;

  // Icons for toggling password visibility
  eyePwdLogin = faEye;
  eyePwd = faEye;
  eyeConfirmPwd = faEye;
  isModalOpen = false;

  hidePasswordLogin = true;
  hidePassword = true;
  hideConfirmPassword = true;

  // Forms
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Initialize forms with stricter validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator]],
    });

    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],  // <-- this is 'confirmPassword'
    }, { validators: this.passwordMatchValidator });
  }
  
  // Custom validator for strong passwords
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
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
  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
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
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => { 
          console.log('Login success:', response);
          this.router.navigate(['/cyberguard']);
        },
        (error: HttpErrorResponse) => { 
          console.log('Login error:', error);
        }
      );
    } else {
      console.log('Login form is invalid');
    }
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe(
        (response: any) => { 
          console.log('Registration successful:', response);
          alert('Registration successful!');
          this.openLoginModal();
        },
        (error: HttpErrorResponse) => { 
          console.error('Registration failed:', error);
        }
      );
    } else {
      console.log('Signup form is invalid');
    }
  }

  openModal() {
    this.isModalOpen = true;
    console.log('Modal opened');
  }

  // Open modals and handle modal visibility
  openLoginModal() {
    this.isLoginVisible = true;
    this.isSignupVisible = false;
    this.isVisible = true;  // Ensure the modal is visible
  }

  closeLoginModal() {
    this.isLoginVisible = false;
    this.isVisible = false;
  }

  openSignupModal() {
    this.isSignupVisible = true;
    this.isLoginVisible = false;
    this.isVisible = true;  // Ensure the modal is visible
  }

  closeSignupModal() {
    this.isSignupVisible = false;
    this.isVisible = false;
  }

  closeModal() {
    this.isVisible = false;
    this.isLoginVisible = false;
    this.isSignupVisible = false;
  }  
}