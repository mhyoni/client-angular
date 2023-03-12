import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angTest';
  email: string;
  isValidEmail: boolean;
  isSending: boolean;
  responseTime: string;

  private apiUrl = 'http://localhost:5000/api/email';


  constructor(private http: HttpClient) { 
    this.email = "";
    this.isValidEmail = false;
    this.responseTime = "";
  }
  CustomSubmit(f: NgForm) {
    let isValid = f.valid;
  }

  onEmailInputChange() {
    this.isValidEmail = /\S+@\S+\.\S+/.test(this.email);
    console.log(this.isValidEmail);

  }

  sendEmail() {
    // this.isSending = true;
    this.http.post(this.apiUrl, { email: this.email }).subscribe(
      (response: any) => {
        const responseDate = new Date(response.date);
        this.responseTime = responseDate.toLocaleTimeString();
      },
      (error: any) => {
        console.error(error);
      }
    );

    timer(3000).subscribe(() => {
      this.responseTime = "";
    });
  }
}
