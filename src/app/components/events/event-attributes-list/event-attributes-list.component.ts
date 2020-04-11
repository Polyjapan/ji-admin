import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-event-attributes-list',
  templateUrl: './event-attributes-list.component.html',
  styleUrls: ['./event-attributes-list.component.css']
})
export class EventAttributesListComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public attributes: {}) { }

  ngOnInit(): void {
  }

}
