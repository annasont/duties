import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Duty } from '../interfaces';

const BASE_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private model = 'duties'

  constructor(private http:HttpClient) { }

  all():Observable<Duty[]> {
    return this.http.get<Duty[]>(this.getUrl())
  }

  create(duty: Duty){
    return this.http.post<Duty>(this.getUrl(), duty)
  
  }

  update(duty: Duty){
    return this.http.put<Duty>(this.getUrlById(duty), duty)

  }

  delete(duty: Duty){
    return this.http.delete<void>(this.getUrlById(duty))

  }

  private getUrl() {
    return `${BASE_URL}${this.model}`
  }

  private getUrlById(duty: Duty) {
    return `${this.getUrl()}/${duty.id}`
  }

}
