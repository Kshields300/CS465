import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, lastValueFrom} from 'rxjs';

import {Trip} from '../models/trip';

import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE} from '../storage';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject (BROWSER_STORAGE) private storage: Storage
  ) {}
  
  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  getTrips(): Observable<Trip[]> {
    console.log(this.tripUrl);
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip) : Observable<Trip[]> {
    console.log("Inside TripDataService::AddTrips");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    console.log("headers complete, ready to return");
    return this.http.post<Trip[]>(this.tripUrl, formData, {headers: headers});
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    console.log('Inside TripdataService::getTrip');
    console.log(this.tripUrl);
    console.log(tripCode);
    console.log(this.tripUrl + '/' + tripCode);
    return this.http.get<Trip[]>(this.tripUrl + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    console.log('Inside TripDataService::UpdateTrips');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    console.log("headers complete, ready to return");
    return this.http.put<Trip>(this.tripUrl + formData.code, formData,{
      headers: headers});
  }

  //Call to our /login endpoint, returns JWT
  login(user: User) : Promise<AuthResponse>{
    console.log('Inside TripDataService::Login');
    return this.makeAuthAPICall('login', user);
  }

  //Call to our /register endpoint, creates user and returns JWT
  register(user: User) : Promise<AuthResponse>{
    console.log('Inside TripDataService::register');
    return this.makeAuthAPICall('register', user);
  }

  //Helper method to process both login and register methods
  
  private async makeAuthAPICall(
    urlPath: string,
    user: User
  ):
  Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return (await lastValueFrom(this.http.post(url,user))) as AuthResponse;
  }

}
