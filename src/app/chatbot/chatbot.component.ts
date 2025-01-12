import { Component } from '@angular/core';
import { Router } from '@angular/router';  // ✅ Import the Router
import { faEdit, faPaperPlane,faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ChatbotService } from '../chatbot.service'; // <-- Import the service

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

  constructor(private chatbotService: ChatbotService, private router: Router) {}

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
