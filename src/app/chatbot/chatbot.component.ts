import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPaperPlane, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ChatbotService } from '../chatbot.service'; // <-- Import the service
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface Message {
  text: string;
  isUser: boolean;  // true if the message is from the user, false if from the bot
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  sendIcon = faPaperPlane;
  newConversationIcon = faEdit;
  homeIcon = faHome;              // Home icon
  logoutIcon = faSignOutAlt;      // Logout icon

  messages: Message[] = [];
  userInput: string = '';
  userFirstName: string | null = null;  // Add this property to track the username

  constructor(
    private toastr: ToastrService,
    private chatbotService: ChatbotService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef here
  ) {
    this.userFirstName = localStorage.getItem('firstName'); // Initialize the username
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

  // Method to send a message
  sendMessage() {
    if (this.userInput.trim() !== '') {
      this.messages.push({ text: this.userInput, isUser: true });
      const currentMessage = this.userInput;
      this.userInput = '';  // Clear the input field
      
      // Call the backend API to get the bot response
      this.chatbotService.getBotResponse(currentMessage)
        .subscribe(response => {
          if (response && response.response) {
            this.messages.push({ text: response.response, isUser: false });
          } else {
            this.messages.push({ text: 'Sorry, I could not respond to your question.', isUser: false });
          }
        });
    }
  }

  // Method to start a new conversation
  startNewConversation() {
    this.messages = [];
    this.userInput = '';
  }

  // Navigate to the home page
  goHome(): void {
    this.router.navigateByUrl('/#home');
  }
}
