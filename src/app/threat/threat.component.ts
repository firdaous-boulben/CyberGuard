import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { ThreatService } from '../threat.service';
import { faChartBar, faKeyboard, faNetworkWired, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-threat',
  templateUrl: './threat.component.html',
  styleUrls: ['./threat.component.css']
})
export class ThreatComponent {


  ipAddress: string = '';
  errorMessage: string = '';
  successMessage: string = '';


  onSubmit(): void {
    this.networkGraphService.submitIp(this.ipAddress).subscribe(
      (response) => {
        this.successMessage = 'IP address submitted successfully!';
        this.errorMessage = '';
        console.log(response);
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
        this.successMessage = '';
        console.error(error);
      }
    );
  }
  faNetworkWired = faNetworkWired;
  faKeyboard = faKeyboard;
  faChartBar = faChartBar;

  // Add logout and home icons
  logoutIcon = faSignOutAlt;
  homeIcon = faHome;

  userFirstName: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private networkGraphService: ThreatService
  ) {}

  // Navigate to the home page
  goHome(): void {
    this.router.navigateByUrl('/#home');
  }

  // Logout function
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
          // Successfully logged out, remove token and username
          localStorage.removeItem('token');
          localStorage.removeItem('firstName');
          this.userFirstName = null;  // Manually clear the username
          this.toastr.success('Logged out successfully!', 'Success');
          this.router.navigateByUrl('/#home');  // Navigate to home
          this.cdr.detectChanges();  // Trigger change detection to update the view
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
