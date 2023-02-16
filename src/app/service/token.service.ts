import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvironmentService } from '../environment.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class TokenService {

  hostUrl = environment.apiURL;
  hasToken = new BehaviorSubject<any>(false)

  constructor(
    private http: HttpClient,
    private envService: EnvironmentService
  ) {
    //console.log("this",this.envService.apiUrl)
  }

  generateToken() {
    const data = 'grant_type=password';
    let headers = new HttpHeaders();
    headers = headers.set("UserName", "k2user");
    headers = headers.set("Password", "k2123456");
    headers = headers.set("ClientID", "1");
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");

    return new Promise<boolean>((resolve) => {
      if (sessionStorage.getItem("token")) {
        resolve(true);
      } else {
        this.http
          .post(`${this.envService.apiUrl}Token`, data, {
            headers,
          })
          .toPromise()
          .then(
            (token_data: any) => {
              if (token_data["access_token"]) {
                //console.log(token_data);
                sessionStorage.setItem("token", token_data["access_token"]);
                resolve(true);
              }
            }
          ).catch(() => {
            resolve(false);
          })
      }
    });
  }
}