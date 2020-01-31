import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlAdress = environment.apiUrl + "students";

  constructor(private http: HttpClient) { }

  getAllStudents() {
    return this.http.get(this.urlAdress);
  }

  findStudent(i) {
    return this.http.get(this.urlAdress+"/"+i);
  }

  createStudent(student){
    return this.http.post(this.urlAdress, student);
  }

  delStudent(i){
    return this.http.delete(this.urlAdress+"/"+i);
  }

  updateStudent(i, student){
    return this.http.put(this.urlAdress+"/"+i, student);
  }

}
