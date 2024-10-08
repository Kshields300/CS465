import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  //Set up storage and service access
  constructor(
    @Inject (BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  //Variable to handle Auth responses
  authResp: AuthResponse = new AuthResponse();

  //Get our token from our Storage provider
  //NOTE: For this application we have decided that we will name
  //the key for our token 'travlr-token'
  public getToken(): string {
    return String(this.storage.getItem('travlr-token'));
  }

  //Save our token to our Storage provider
  //NOTE: key for token is 'travlr-token'
  public saveToken (token: string) : void {
    this.storage.setItem('travlr-token', token);
  }

  //Login method that leverages the login method in TripDataService
  //Because that method returns an observable, we subscribe to the result
  //and only process when the Observable condition is satisfied
  //Uncomment the two console.log messages for additional debugging info
  public login (user: User) : Promise<any> {
    return this.tripDataService.login(user)
    .then((authResp: AuthResponse) =>
    this.saveToken(authResp.token));
  }

  //Register method that leverages the register method in
  //tripDataService
  //Because that method returns an observable, we subscribe to the
  //result and only process when the observable condition is satisfied
  //Uncomment the two console.log messages for additioanl debugging
  //Please note: This method is nearly identifcal to the login method
  //because the behavior of the API logs a new user in immediately
  //upon registration
  public register(user: User) : Promise<any> {
    return this.tripDataService.register(user)
    .then((authResp: AuthResponse) =>
    this.saveToken(authResp.token));
  }


  //Logout of our application and remove the JWT from Storage
  public logout(): void{
    this.storage.removeItem('travlr-token');
  }

  //Boolean to determine if we are logged in and the token is
  //still valid. Even if we have a token we will still have to
  //reauthenticate if the token has expired
  public isLoggedIn(): boolean{
    const token: string = this.getToken();
    if(token != 'null'){
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    else{
      return false;
    }
  }

  //Retrieve the current user. This function should only be called
  //after the calling method has checked to make sure that the user
  //isLoggedIn.
  public getCurrentUser(): User{
    if(this.isLoggedIn()){
      const token: string = this.getToken();
      if(token != 'null'){
        const {email, name } = JSON.parse(atob(token.split('.')[1]));
        return {email, name} as User;
      }
    }
    const email: string = '';
    const name: string = '';
    return {email, name} as User;
  }
}