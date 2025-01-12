import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { faClock, faShieldAlt, faEye, faChartLine, faExclamationTriangle, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { WelcomeModalComponent } from '../welcome-modal/welcome-modal.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';  // ✅ Import the Router
import { HttpClient } from '@angular/common/http'; // ✅ Import HttpClient
import { ChangeDetectorRef } from '@angular/core';  // Import ChangeDetectorRef


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // Define icons used in the component
  faClock = faClock;
  faShieldAlt = faShieldAlt;
  faEye = faEye;
  faChartLine = faChartLine;
  faUserCog = faUserCog;
  faExclamationTriangle = faExclamationTriangle;
  logoutIcon = faSignOutAlt;  // Define the logout icon
  userFirstName: string | null = null;

  @ViewChild('welcomeModal') welcomeModal!: WelcomeModalComponent;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService,
    private router: Router,  // Inject Router here
    private http: HttpClient , // Inject HttpClient here
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef here

  ) {}

  ngOnInit() {
    // Check if running on the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.userFirstName = localStorage.getItem('firstName');
    }
  }

  // Modal actions
  openWelcomeModal() {
    this.welcomeModal.openModal();
  }

  openLoginModal() {
    this.welcomeModal.openLoginModal();
  }

  openSignupModal() {
    this.welcomeModal.openSignupModal();
  }

  logout(): void {
    console.log('Logout method called');
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No active session found.');
      this.toastr.error('No active session found.', 'Error');
      this.router.navigateByUrl('/#home');
      return;
    }

    // Send logout request to backend API
    this.http.post('http://localhost:8080/api/v1/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` },
      observe: 'response'
    }).subscribe({
      next: (response) => {
        console.log('Logout response:', response);
        if (response.status === 200 || response.status === 204) {
          // Successfully logged out, remove token, reset user info and navigate to home
          localStorage.removeItem('token');
          localStorage.removeItem('firstName');
          this.userFirstName = null;  // Manually clear the username
          this.toastr.success('Logged out successfully!', 'Success');
          this.router.navigateByUrl('/#home');
          this.cdr.detectChanges();  // Trigger change detection manually
        } else {
          this.toastr.error('Logout failed on the server.', 'Error');
        }
      },
      error: (err) => {
        console.error('Logout error:', err);
        this.toastr.error('Logout failed. Please try again.', 'Error');
        this.router.navigate(['/login']);
      }
    });
  }
}
