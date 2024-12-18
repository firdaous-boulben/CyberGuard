import { Component } from '@angular/core';
import { faEdit, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface Message {
  text: string;
  isUser: boolean;  // true if the message is from the user, false if from the bot
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  sendIcon = faPaperPlane;
  newConversationIcon = faEdit;

  messages: Message[] = [];
  userInput: string = '';

    // Method to send a message
    sendMessage() {
        if (this.userInput.trim() !== '') {
            // Push the user's message to the messages array
            this.messages.push({ text: this.userInput, isUser: true });
            this.userInput = '';  // Clear the input field
            
            // Simulate a bot response
            this.simulateBotResponse();
        }
    }

    // Simulated bot response (replace this with actual API call logic)
    simulateBotResponse() {
        const botResponse = "Hello! I’m CyberGuard, your virtual security assistant. How can I help you today?";
        this.messages.push({ text: botResponse, isUser: false });
    }

    // Method to start a new conversation
    startNewConversation() {
      // Clear messages and user input
      this.messages = [];
      this.userInput = '';
      // Optionally, clear conversation history if needed
      // this.conversationHistory = [];
  }
}
