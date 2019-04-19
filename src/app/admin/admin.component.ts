import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { ClassdataService } from '../classdata.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  @Output() sendUser: EventEmitter<any>=new EventEmitter();

  username;
  fullname;
  users=[];
  constructor(private storage:SessionStorageService,private _serv:ClassdataService) {
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


   }

   


  ngOnInit() {
  }

  Submit(value)
  {
   
    this.sendUser.emit(value.username);
  }
}
