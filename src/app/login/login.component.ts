import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _form:FormBuilder,private _router:Router) { }

  ngOnInit() {
  }

  login_form=this._form.group({

    uname:[,[Validators.required]],
    pword:[,[Validators.required]]
  });


  Signup(){
this._router.navigate(['/signup']);
  }

  onSubmit()
  {
    
  }
}
