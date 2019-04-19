import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ClassdataService {

  
  users:AngularFireList<any>;
  batches:AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase) { 
    this.users=this.firebase.list('/Data/Users');
    this.batches=this.firebase.list('/Data/Batches');
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

  insertBatch(temp)
  {
    
    this.batches.push(
      {
        batchname:temp.batchname,
        fees:temp.batchfees
      }
    )

  }


  getUsers()
  {
    this.users=this.firebase.list('/Data/Users');
    return this.users.snapshotChanges();
  }

}
