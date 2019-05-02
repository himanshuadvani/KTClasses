import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { ClassdataService } from '../classdata.service';
import { Validators, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  @Output() sendUser: EventEmitter<any>=new EventEmitter();
  user={$key:"",username:"",fullname:"",email:"",contact:"",batches:[]};
 
  users=[];
  batches=[];
  userbatch=[];
  amount=0;
  totalAmount=0;
  username;
  fullname;
 
  batchFlag=false;
  
  uname;
 



  constructor(private storage:SessionStorageService,private _serv:ClassdataService,private _form:FormBuilder) {
    this.fullname=this.storage.get('user').fullname;
    this.username=this.storage.get('user').username;
    
    this._serv.getUsers().subscribe(
      list => {
        this.users = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

      this._serv.getBatches().subscribe(
        list => {
          this.batches = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });

   }



   update_Form=this._form.group(
    {
      $key:[],
      uname:[,[Validators.required]],
      fname:[,[Validators.required]],
      email:[,[Validators.required,Validators.email]],
      cont:[,[Validators.required,Validators.pattern,Validators.minLength(10),Validators.maxLength(10)]],
      batch:[]
      
    }
  );


   populateForm(value)
   {
   
    for(var i=0;i<this.users.length;i++)
    {
      if(this.users[i].$key==value)
      {
      
      this.update_Form.reset();
        this.update_Form.controls['$key'].setValue(this.users[i].$key);
      this.update_Form.controls['uname'].setValue(this.users[i].username);
      this.update_Form.controls['fname'].setValue(this.users[i].fullname);
      this.update_Form.controls['email'].setValue(this.users[i].email);
      this.update_Form.controls['cont'].setValue(this.users[i].contact);
      if(this.users[i].batches)
      {
        this.userbatch=this.users[i].batches.split(',');
      }
      else{
        this.userbatch=[];
      }
    
     break;
     
    }
    
    }
   }


  ngOnInit() {
  }

  Submit(value)
  {
    this.sendUser.emit(value.username);
  }

  onEditUser()
  {
    for(var i=0;i<this.users.length;i++)
    {
      if(this.users[i].username==this.update_Form.value.uname)
      {
        this.amount=parseInt(this.users[i].totalAmount);
      }
    }
    for(var i=0;i<this.batches.length;i++)
    {
      if(this.update_Form.value.batch==this.batches[i].batchname)
      {
        this.totalAmount=this.amount+parseInt(this.batches[i].fees);
      }
    }
    this._serv.editUser(this.update_Form.value,this.userbatch,this.totalAmount);
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


    for(var i=0;i<this.users.length;i++)
    {
      if(this.users[i].$key==$key)
      { 

        temp=this.users[i].batches.split(',');
        totalAmount=this.users[i].totalAmount;
        paidAmount=this.users[i].paidAmount;
        
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
        this._serv.deleteUserBatch($key,result,totalAmount-amount,paidAmount);
      }
    }

  

  }

}
