import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

declare const google: any;

interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
}

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    google.accounts.id.initialize({
      client_id: '786933628364-61rrfub3jcv0ig0v81re68sjn78rttgc.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      {
        theme: 'outline',
        size: 'large',
        width: 300
      }
    );
  }

  handleLogin(response: any) {

    const user = jwtDecode<GoogleUser>(response.credential);

    console.log('Google login successful');
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Picture:', user.picture);

    // Save logged-in user temporarily
    localStorage.setItem('googleUser', JSON.stringify(user));

    this.router.navigate(['/dashboard']);
  }
}