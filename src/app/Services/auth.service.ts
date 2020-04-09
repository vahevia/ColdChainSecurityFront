import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;
  token:any;
  url = 'https://coldchainsecurity.herokuapp.com/';

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
  ) { }

  login(username: String, password: String) {
    this.isLoggedIn = true;
    return this.http.post(this.url + 'auth/login',
      {username: username, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }
 
  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    this.isLoggedIn = false;
    return this.http.get(this.url + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.url + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}