import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ClassdataService {

  
  users:AngularFireList<any>;
  admin:AngularFireList<any>;
  batches:AngularFireList<any>;
  userbatch:AngularFireList<any>;


  constructor(private firebase:AngularFireDatabase) { 
    this.users=this.firebase.list('/Data/Users');
    this.batches=this.firebase.list('/Data/Batches');
    this.admin=this.firebase.list('Data/Admin');
  }


  insertUser(temp)
  {
    
    this.users.push(
      {
        username:temp.uname,
        fullname:temp.fname,
        email:temp.email,
        contact:temp.cont,
        password:temp.pword
      }
    )

  }

  insertAdmin(temp)
  {
    
    this.admin.push(
      {
        username:temp.uname,
        fullname:temp.fname,
        email:temp.email,
        contact:temp.cont,
        password:temp.pword,
        totalAmount:0,
        paidAmount:0
      }
    )

  }

  insertBatch(temp)
  {
    this.batches.push(
      {
        batchname:temp.batchname,
        fees:temp.batchfees
      }
    )

  }


  
  editUser(user,userbatch,totalAmt)
  {
    var temp;
    if(user.batch=="" || user.batch==null || user.batch==" ")
    {
      this.users.update(user.$key,
        {
          username:user.uname,
          fullname:user.fname,
          email:user.email,
          contact:user.cont
        });
    }
    else{
      if(userbatch.length==0)
      temp=user.batch;
    else{
    userbatch.push(user.batch);
      temp=userbatch.toString();
    }
  this.users.update(user.$key,
    {
      username:user.uname,
      fullname:user.fname,
      email:user.email,
      contact:user.cont,
      batches:temp,
      totalAmount:totalAmt
    });

    }

   

  }


  getUsers()
  {
    this.users=this.firebase.list('/Data/Users');
    return this.users.snapshotChanges();
  }
  
  getBatches()
  {
    this.batches=this.firebase.list('/Data/Batches');
    return this.batches.snapshotChanges();
  }

  deleteBatch(batchKey)
  {
    this.batches.remove(batchKey);
  }

  deleteUserBatch($key,temp,totalAmount,paidAmount)
  {
    if(temp.length==0)
    {
      temp=null;
      totalAmount=0;
      paidAmount=0;
      
    }
    
      this.users.update($key,
        {
          totalAmount:totalAmount,
          paidAmount:paidAmount,     
          batches:temp
        });
    
 
  
  }

}
