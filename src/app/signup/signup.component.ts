import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _form:FormBuilder,private _router:Router) { }

  ngOnInit() {
  }

  signup_Form=this._form.group(
    {
      uname:[,[Validators.required]],
      fname:[,[Validators.required]],
      email:[,[Validators.required,Validators.email]],
      cont:[,[Validators.required,Validators.pattern,Validators.minLength(10),Validators.maxLength(10)]],
      pword:[,[Validators.required]],
      cpword:[,[Validators.required]]
    }
  )

  Login(){
this._router.navigate(['/login']);
  }

  onSignup()
  {
    
  }
}
