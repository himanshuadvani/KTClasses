import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { ClassdataService } from '../classdata.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { $ } from 'protractor';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  
fee="";
currentUser="";
fullname="";
username="";
email="";
contact="";
user="";
isAdmin=false;
users=[];

hide=false;


@ViewChild("newbatch") newbatch:ElementRef;

  constructor(private _serv:SessionStorageService,private _data:ClassdataService,private form:FormBuilder,private router:Router) {

    this.currentUser=this._serv.get('user');
    this.fullname=this._serv.get('user').fullname;

    if(this._serv.get('user').username=="kajoltilokchandani")
    {
      this.isAdmin=true;
    }

    this._data.getUsers().subscribe(
      list => {
        this.users = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

      this.username=this._serv.get('user').username;
      this.email=this._serv.get('user').email;
      this.contact=this._serv.get('user').contact;


  }

  batch_Form=this.form.group(
    {
      batchname:[],
      batchfees:[]
      
    }
  )

  ngOnInit() {
  }

  editDetails()
  {
    alert("Inside EditDetails");
  }

  displayData($event)
  {
    this.fee=$event;
  }

  addBatch()
  {
    this._data.insertBatch(this.batch_Form.value);
    alert("Batch added successfully...");
    this.newbatch.nativeElement.hide();
    
  }

}
