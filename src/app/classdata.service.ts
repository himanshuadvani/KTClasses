import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ClassdataService {

  constructor(private firebase:AngularFireDatabase) { 
    this.users=this.firebase.list('/Data/Users');
  }

  users:AngularFireList<any>;

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


  getUsers()
  {
    this.users=this.firebase.list('/Data/Users');
    return this.users.snapshotChanges();
  }

}
