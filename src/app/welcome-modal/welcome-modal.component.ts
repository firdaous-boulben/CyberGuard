import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.css']
})
export class WelcomeModalComponent implements OnInit {
  isVisible = false;
  isLoginVisible = false;
  isSignupVisible = false;

  eyePwdLogin = faEye;
  eyePwd = faEye;
  eyeConfirmPwd = faEye;
  isModalOpen = false;

  hidePasswordLogin = true;
  hidePassword = true;
  hideConfirmPassword = true;

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator]],
    });

    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const hasMinLength = value.length >= 8;

    return (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar || !hasMinLength)
      ? { weakPassword: true }
      : null;
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

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

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          if (response && response.access_token) {
            this.authService.saveUserData(response);  // Save user data (including first name)
            this.toastr.success('Logged in successfully!', 'Success');
            this.router.navigate(['/cyberguard']);
          } else {
            this.toastr.error('Login failed. No token received.', 'Error');
          }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Login failed. Please check your credentials.', 'Error');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields correctly.', 'Warning');
    }
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe(
        (response: any) => {
          this.authService.saveUserData(response);  // Save user data (including first name)
          this.toastr.success('Registration successful!', 'Success');
          this.openLoginModal();
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Registration failed. Please try again.', 'Error');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields correctly.', 'Warning');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  openLoginModal() {
    this.isLoginVisible = true;
    this.isSignupVisible = false;
    this.isVisible = true;
  }

  closeLoginModal() {
    this.isLoginVisible = false;
    this.isVisible = false;
  }

  openSignupModal() {
    this.isSignupVisible = true;
    this.isLoginVisible = false;
    this.isVisible = true;
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
