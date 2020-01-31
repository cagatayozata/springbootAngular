import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { TestBed } from '@angular/core/testing';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  // form data
  nametext;
  schooltext;
  cpgatext;

  student;
  error = false;
  show = false;

  myControl = new FormControl();
  options: User[] = [
    { name: 'Bilkent University' },
    { name: 'ODTU' },
    { name: 'Baskent University' }
  ];
  filteredOptions: Observable<User[]>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  clickNew() {
    this.student = { "name": this.nametext, "school": this.schooltext, "cgpa": this.cpgatext };
    this.newStudent(this.student);
  }

  newStudent(student) {
    this.userService.createStudent(student).subscribe((data => {
      this.error = false;
      this.show = true;
      // clear text areas
      this.nametext = "";
      this.schooltext = "";
      this.cpgatext = "";
    }),
      (err) => {
        this.error = true;
        this.show = true;
        console.log(err);
      });
  }
  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
