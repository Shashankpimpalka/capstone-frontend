import { Component, ElementRef, viewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionOnPdf } from '../QuestionOnPdf';
import { pdfChat } from '../pdfChat';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat.with.pdf',
  imports: [MarkdownModule,
    CommonModule, 
    FormsModule, ],
  templateUrl: './chat.with.pdf.component.html',
  styleUrl: './chat.with.pdf.component.css',
})
export class ChatWithPdfComponent {


  userInput: string = '';
  chatHistory: { sender: 'user' | 'jarvis'; message: string ; sources: string[] }[] = [];
  uploadedFiles?: any[]=[];
  isThinking: boolean = false;
  pdfChat?: pdfChat;
  questionOnPdf?: QuestionOnPdf;

  constructor(private chatService: ChatService) { }



  onFileSelected(event: any){
    const file: File = event.target.files[0];
    if(file)    
      {
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.chatService.uploadPdf(formData).subscribe({
        next: (response)=>{
          console.log(response)
          this.chatHistory.push({sender:'jarvis',message: response, sources: []})
          alert("File uploaded successfully!")
          this.isThinking = false;
        },
        error: (err)=>{console.error('Error uploading file:', err)}
      });
      this.isThinking = true;
    }
      const reader = new FileReader();
    }

    clearDatabase(){
      this.chatService.clearDatabase().subscribe({
        next: (response)=>{
          alert("Database cleared successfully!")
        },
        error: (err)=>{console.error('Error clearing database:', err)}
      });
    }
  
    sendMessage(){
      if(!this.userInput.trim()) return;
      this.chatHistory.push({sender:'user',message: this.userInput, sources: []})
      const question = this.userInput;
      this.questionOnPdf = {
        question: question,
        topK: 3
      }
      this.userInput = '';
      this.isThinking = true;
      this.chatService.chatWithPdf(this.questionOnPdf).subscribe({
        next: (response)=>{
          console.log(response)
          this.chatHistory.push({sender:'jarvis',message: response.answer, sources: response.sources})
          this.isThinking = false;
        },
        error: (err)=>{console.error('Error getting response:', err)}
      });
    }



}

