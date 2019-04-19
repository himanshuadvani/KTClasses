import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  fee="";
  constructor() { }

  ngOnInit() {
  }

  acceptedUser($event)
  {
    alert($event)
    this.fee=$event;
  }
}
