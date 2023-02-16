import { Injectable } from '@angular/core';

export enum Environment {
  Prod = "prod",
  Staging = "staging",
  Test = "test",
  Dev = "dev",
  Local = "local",
  production = "true",
}

export const env_data = () => {
  const hostname = window && window.location && window.location.hostname;
  let apiUrl, envv, hmr, pro;

  if (/^.*localhost.*/.test(hostname)) {
    envv = Environment.Staging;
    pro = false;
    apiUrl = "https://stagingclientapi.kacu.app/API/V1.0/";
    //apiUrl = "https://stagingInternalapi.kacu.app/API/V1.0/";
  } else if (/^stagingadmin.kacu.app/.test(hostname)) {
    envv = Environment.Staging;
    pro = Environment.production;
    apiUrl = "https://stagingclientapi.kacu.app/API/V1.0/";
  } else {
    envv = Environment.Prod;
    pro = Environment.production;
    apiUrl = "https://stagingclientapi.kacu.app/API/V1.0/";
  }
  return { apiUrl, envv, pro };
};

@Injectable({
  providedIn: 'root'
})

export class EnvironmentService {
  private _env:any = Environment;
  private _apiUrl:any

  get env(): Environment {
    return this._env;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor() { }

  public init(): Promise<void> {
    return new Promise((resolve) => {
      this.setEnvVariables();
      resolve();
    });
  }

  public setEnvVariables(): void {
    const hostname = window && window.location && window.location.hostname;

    if (/^.*localhost.*/.test(hostname)) {
      this._env = Environment.Test;
      this._apiUrl = "https://stagingclientapi.kacu.app/API/V1.0/";
      //this._apiUrl = "https://stagingInternalapi.kacu.app/API/V1.0/";
    } else if (/^stagingadmin.kacu.app/.test(hostname)) {
      this._env = Environment.Staging;
      this._apiUrl = "https://stagingclientapi.kacu.app/API/V1.0/";
    } else {
      this._env = Environment.Prod;
      this._apiUrl = "https://stagingclientapi.kacu.app/API/V1.0/";
    }
  }
}
