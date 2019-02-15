import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WindowService } from '../window.service';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  windowRef: any;

  verificationCode: String;

  mobileNumber = new FormControl('');
  bool1: boolean;
  otpNumber = new FormControl('');
  bool2: boolean;
  aadhaarID = new FormControl('');
  bool3: boolean;
  name = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  rPassword = new FormControl('');
  bool4: boolean;

  constructor(private win: WindowService) { }

  ngOnInit() {
    this.bool1 = true;
    this.bool2 = false;
    this.bool3 = false;
    this.bool4 = false;

    firebase.initializeApp(environment.firebase)

    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
  }
  
  invalidMobile() {
    let length = this.mobileNumber.value.length;
    var isnum = /^\d+$/.test(this.mobileNumber.value);
    if(length != 10)
      return false;
    else if(!isnum)
      return false
    else
      return true;
  }

  getNumber() {
    return `+91${this.mobileNumber.value}`
  }

  mobile(){
    let number = this.getNumber();
    console.log(number)
    firebase.auth().useDeviceLanguage();

    const appVerifier = this.windowRef.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(number, appVerifier)
            .then(result => {
              console.log(result)
              this.windowRef.confirmationResult = result;
            })
            .catch( error => console.log(error) );

    this.bool1 = false;
    this.bool2 = true;
  }

  invalidOtp() {
    let length = this.otpNumber.value.length;
    var isnum = /^\d+$/.test(this.otpNumber.value);
    if(length != 6)
      return false;
    else if(!isnum)
      return false
    else
      return true;
  }

  otp(){
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {})
                  .catch( error => console.log(error, "Incorrect code entered?"));
    this.bool2 = false;
    this.bool3 = true;
  }

  invalidAadhaar() {
    let length = this.aadhaarID.value.length;
    var isnum = /^\d+$/.test(this.aadhaarID.value);
    if(length != 12)
      return false;
    else if(!isnum)
      return false
    else
      return true;
  }

  aadhaar(){
    // Send OTP
    this.bool3 = false;
    this.bool4 = true;
  }

  invalidDetails() {
    let length = this.name.value.length;
    if(length < 4)
      return false;
    else if(this.password.value.length == 0)
      return false;
    else if(!(this.password.value===this.rPassword.value))
      return false;
    else
      return true;
  }

  details() {
    // Send OTP
    this.bool4 = false;
    // this.bool4 = true;
  }

}
