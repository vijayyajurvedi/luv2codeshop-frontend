import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {



  private bases_url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public loginUserFromRemote(user: User): Observable<any> {

    return this.http.post(this.bases_url + '/login', user);


  }

  registerUserFromRemote(user: User): Observable<any> {
    return this.http.post(this.bases_url + '/registeruser', user);

  }

}
