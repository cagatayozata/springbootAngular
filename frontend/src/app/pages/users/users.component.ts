import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  // all users 
  students;

  // temporary data for update operation
  student;

  // form data
  id;
  nametext: any;
  schooltext: any;
  cpgatext: any;

  // error 
  errorUpd = false;
  showUpd = false;

  showForm = false;

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.userService.getAllStudents().subscribe(data => {
      console.log(data);
      this.students = data;
    });
  }

  delButton(i) {

    this.userService.delStudent(i).subscribe((data => {
      this.getAllStudents();
      this.snackBar.open("Student is deleted!", "CLOSE", {
        duration: 3000,
      });
    }),
      (err) => {
        this.snackBar.open("Student is NOT deleted!", "CLOSE", {
          duration: 3000,
        });
        console.log(err);
      });

  }

  uptButton() {
    this.student = { "name": this.nametext, "school": this.schooltext, "cgpa": this.cpgatext };
    this.userService.updateStudent(this.id, this.student).subscribe((data => {
      this.getAllStudents();
      this.showForm = false;
      this.snackBar.open("Student is updated!", "CLOSE", {
        duration: 3000,
      });
    }),
      (err) => {
        this.showUpd = true;
        console.log(err);
        this.snackBar.open("Student is NOT updated!", "CLOSE", {
          duration: 3000,
        });
      });
  }

  showUpt(i, name, schol, cgp) {
    this.id = i;
    this.nametext = name;
    this.cpgatext = cgp;
    this.showForm = true;
  }

}
