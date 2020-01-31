import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { empty } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private UserService: UserService, private snackBar: MatSnackBar) { }

  student;
  error;

  ngOnInit() {
  }

  getStudent(i) {
    this.UserService.findStudent(i).subscribe((data => {
      this.student = data;
      this.snackBar.open("Student is found!", "CLOSE", {
        duration: 3000,
      });
      this.error=true;
    }), (err) => {
      this.snackBar.open("Student is NOT found!", "CLOSE", {
        duration: 3000,
      });
      this.error=false;
      console.log(err);
    });
  }

  searchButton(i) {
    this.getStudent(i);
  }

}
