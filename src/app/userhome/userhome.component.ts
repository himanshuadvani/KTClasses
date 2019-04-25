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
  
totalAmount=0;
paidAmount=0;
balAmount=0;
currentUser="";
fullname="";
username="";
email="";
contact="";
clickedUser="";
isAdmin=false;
users=[];
batches=[];


@ViewChild("newbatch") newbatch:ElementRef;


ngOnInit() {
 
}

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

      this._data.getBatches().subscribe(
        list => {
          this.batches = list.map(item => {
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


  editDetails()
  {
    alert("Inside EditDetails");
  }

  displayData($event)
  {
    this.clickedUser=$event;
    for(var i=0;i<this.users.length;i++)
    {
      if(this.users[i].username==this.clickedUser)
      {
        this.totalAmount=this.users[i].totalAmount;
        this.paidAmount=this.users[i].paidAmount;
        this.balAmount=this.totalAmount-this.paidAmount;
      }
    }

  }

  addBatch()
  {
    this._data.insertBatch(this.batch_Form.value);
   alert("Batch added.");
   this.batch_Form.reset();
  }

  logoutUser()
  {
   if(confirm("Do you want to Logout?"))
   {
    this._serv.clear();
     window.location.href="/";
    
    }
  }

  deleteBatch($key,batchname)
  {
    if(confirm("Do you want to delete this batch? "+batchname))
    {
      this._data.deleteBatch($key);
    }
  }

}
