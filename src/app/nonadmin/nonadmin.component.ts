import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { ClassdataService } from '../classdata.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nonadmin',
  templateUrl: './nonadmin.component.html',
  styleUrls: ['./nonadmin.component.css']
})
export class NonadminComponent implements OnInit {


  
  currentUser="";
  fullname="";
  username="";
  email="";
  contact="";
  user="";
  isAdmin=false;
  userslist=[];
  batches=[];
  userbatch=[];
  key;
  amount=0;
  totalAmount: number=0;


  updateForm=this._form.group(
    {
      $key:[],
      uname:[,[Validators.required]],
      fname:[,[Validators.required]],
      email:[,[Validators.required,Validators.email]],
      cont:[,[Validators.required,Validators.pattern,Validators.minLength(10),Validators.maxLength(10)]],
      batch:[]
      
    }
  );

  
  ngOnInit() {
  }


  constructor(private _serv:SessionStorageService,private _data:ClassdataService,private _form:FormBuilder) {
  
  if(this._serv.get('user').username=="kajoltilokchandani")
  {
    this.isAdmin=true;
  }
  
  this._data.getUsers().subscribe(
    list => {
      this.userslist = list.map(item => {
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


      this.fullname=this._serv.get('user').fullname;
      this.currentUser=this._serv.get('user');
      
      this.key=this._serv.get('user').$key;
      this.username=this._serv.get('user').username;
      this.email=this._serv.get('user').email;
      this.contact=this._serv.get('user').contact;
      if(this._serv.get('user').batches!=undefined)
      {
        this.userbatch=this._serv.get('user').batches.split(',');
 
      } 
      else
      {
        this.userbatch=[];
      }
      
      }
    
    

     
   populateForm(value)
   {
   
    for(var i=0;i<this.userslist.length;i++)
    {
      
      if(this.userslist[i].$key==value)
      {
      
      this.updateForm.reset();
        this.updateForm.controls['$key'].setValue(this.userslist[i].$key);
      this.updateForm.controls['uname'].setValue(this.userslist[i].username);
      this.updateForm.controls['fname'].setValue(this.userslist[i].fullname);
      this.updateForm.controls['email'].setValue(this.userslist[i].email);
      this.updateForm.controls['cont'].setValue(this.userslist[i].contact);
      if(this.userslist[i].batches)
      {
        this.userbatch=this.userslist[i].batches.split(',');
      }
      else{
        this.userbatch=[];
      }
    
     break;
     
    }
    
    }
   }



     onEditUser()
     {
       for(var i=0;i<this.userslist.length;i++)
       {
         if(this.userslist[i].username==this.updateForm.value.uname)
         {
           this.amount=parseInt(this.userslist[i].totalAmount);
           break;
         }
       }
       for(var i=0;i<this.batches.length;i++)
       {
         if(this.updateForm.value.batch==this.batches[i].batchname)
         {
           this.totalAmount=this.amount+parseInt(this.batches[i].fees);
           break;
         }
       }

  
       this._data.editUser(this.updateForm.value,this.userbatch,this.totalAmount);
       alert("Data Updated Successfully...");
       window.location.href="/userhome";
     }

     deleteUserBatch($key,ele)
     {
       var amount=0;
       var totalAmount=0;
       var paidAmount=0;
       var temp=[];
   
       
       for(var i=0;i<this.batches.length;i++)
       {
         if(this.batches[i].batchname==ele)
         {
           amount=this.batches[i].fees;
         }
       }
   
   
       for(var i=0;i<this.userslist.length;i++)
       {
         if(this.userslist[i].$key==$key)
         { 
   
           temp=this.userslist[i].batches.split(',');
           totalAmount=this.userslist[i].totalAmount;
           paidAmount=this.userslist[i].paidAmount;
           
         }
       }
   
   
   
       for(var i=0;i<temp.length;i++)
       {
         if(ele==temp[i])
         {
           temp.splice(i,1);
           var result=temp.toString();
           if(paidAmount>=amount)
           {
             paidAmount-=amount
           }
           this._data.deleteUserBatch($key,result,totalAmount-amount,paidAmount);
        
         }
       }
   
     
   
     }
   


}
