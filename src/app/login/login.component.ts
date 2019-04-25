import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassdataService } from '../classdata.service';
import {SessionStorageService} from 'angular-web-storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  incorrectFlag:boolean=false;
  users=[];
  constructor(private _form:FormBuilder,private _router:Router,private _route:ActivatedRoute,private _serv:ClassdataService,private _storage:SessionStorageService) {

    this.incorrectFlag=false;
    this._serv.getUsers().subscribe(
      list => {
        this.users = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });


   }

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

    for(var i=0;i<this.users.length;i++)
    {
      if(this.users[i].username==this.login_form.value.uname)
      {
        if(this.users[i].password==this.login_form.value.pword)
        {
          this._storage.set('user',this.users[i]);
          window.location.href="/userhome";
         
          return;
         
        }
        else{
          this.incorrectFlag=true;
          this._router.navigate(['/login']);
         
          
          
        }
      }
      else{
        this.incorrectFlag=true;
        this._router.navigate(['/login']);
      }
    }

    
  }
}
