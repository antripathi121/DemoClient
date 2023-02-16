import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment.service';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(
    private http: HttpClient,
    private envService: EnvironmentService
  ) { }

  getDemoConfig(){
    let id = sessionStorage.getItem("ShopperProfileID");
    let headers = new HttpHeaders();
    headers = headers.set("Accept-Language", "en-us");
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    return this.http.get(`${this.envService.apiUrl}GetConfigDetail`, { headers })
  }
}
