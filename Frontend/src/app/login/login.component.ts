import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mobileNumber = new FormControl('');
  aadhaarID = new FormControl('');
  password = new FormControl('');

  bool: boolean;
  constructor() { }

  ngOnInit() {
    this.bool = true;
  }

  invalidDetails() {
    let lengthMobile = this.mobileNumber.value.length;
    var isnum1 = /^\d+$/.test(this.mobileNumber.value);
    if(lengthMobile != 10)
      return false;
    else if(!isnum1)
      return false
    let lengthAadhaar = this.aadhaarID.value.length;
    var isnum2 = /^\d+$/.test(this.aadhaarID.value);
    if(lengthAadhaar != 12)
      return false;
    else if(!isnum2)
      return false
    else if(this.password.value.length < 6)
      return false;
    else
      return true;
  }

  login() {
    this.bool = false;
  }
}
