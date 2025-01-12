import { Component } from '@angular/core';
import { Router } from '@angular/router';  // ✅ Import the Router
import { faEdit, faPaperPlane,faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
  styleUrls: ['./chatbot.component.css']  // Fixed typo in styleUrl to styleUrls
})
export class ChatbotComponent {
  sendIcon = faPaperPlane;
  newConversationIcon = faEdit;
  homeIcon = faHome;              // Home icon
  logoutIcon = faSignOutAlt;      // Logout icon

  messages: Message[] = [];
  userInput: string = '';


  constructor(
    private toastr: ToastrService,
    private chatbotService: ChatbotService,
    private router: Router,
    private http: HttpClient
  ) { }


 logout(): void {
  console.log('Logout method called');
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('No active session found.');
    this.toastr.error('No active session found.', 'Error');
    this.router.navigateByUrl('/#home');
    return;
  }
  
  this.http.post('http://localhost:8080/api/v1/auth/logout', {}, {
    headers: { Authorization: `Bearer ${token}` },
    observe: 'response'
  }).subscribe({
    next: (response) => {
      console.log('Logout response:', response);
      if (response.status === 200 || response.status === 204) {
        localStorage.removeItem('token');
        this.toastr.success('Logged out successfully!', 'Success');
        this.router.navigateByUrl('/#home');
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
      // Push the user's message to the messages array
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
    // Clear messages and user input
    this.messages = [];
    this.userInput = '';
  }
  // Navigate to the home page
  goHome(): void {
    this.router.navigateByUrl('/#home');  // Navigates to http://localhost:4200/#/home
  }
}
