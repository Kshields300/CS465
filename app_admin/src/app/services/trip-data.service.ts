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
  url = 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api';

  getTrips(): Observable<Trip[]> {
    console.log(this.url);
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip[]> {
    console.log("Inside TripDataService::AddTrips");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    console.log("headers complete, ready to return");
    console.log(this.url);
    console.log(formData);
    console.log(headers);
    return this.http.post<Trip[]>(this.url, formData, {headers: headers});
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    //console.log('Inside TripdataService::getTrips');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    console.log('Inside TripDataService::UpdateTrips');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    console.log("headers complete, ready to return");
    console.log(this.url);
    console.log(formData);
    console.log(headers);
    return this.http.put<Trip>(this.url + '/' + formData.code, formData,{
      headers: headers,
    });
  }

  //Call to our /login endpoint, returns JWT
  login(user: User, passwd: string) : Observable<AuthResponse>{
    console.log('Inside TripDataService::Login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  //Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string) : Observable<AuthResponse>{
    console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  //Helper method to process both login and register methods
  handleAuthAPICall (endpoint: string, user: User, passwd: string) :
  Observable<AuthResponse>{
    console.log('Inside TripDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password:passwd
    };

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint,
      formData);
  }
}
