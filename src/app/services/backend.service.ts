import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private BACKEND_URL = "http://localhost:3000";

  constructor() { }

  getBackendUrl(): string {
    return this.BACKEND_URL;
  }
}
