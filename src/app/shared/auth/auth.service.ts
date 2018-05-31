/**
 * Injectable auth service
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  constructor(private router: Router) { }

  // store user data in local storage when login
  login(data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  // clear the local storage when logout
  logout() {
    localStorage.removeItem('userData');
    const self = this;
    setTimeout(function () {
      self.router.navigate(['/users/login']);
    }, 500);
  }

  // get the user data from local storage
  getUserData(key = null) {
    let userData = localStorage.getItem('userData');
    if (userData) {
      userData = JSON.parse(userData);
      if (userData[key] !== undefined) {
        return userData[key];
      }
      return userData;
    }
    return null;
  }

  // return true if user data found in local storage
  isAuthenticated(): boolean {
    const userData = localStorage.getItem('userData');
    return userData !== null && userData !== '' && userData.length > 0;
  }
}
