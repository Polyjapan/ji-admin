import {Component, Inject, OnInit} from '@angular/core';
import {UserData} from "../../../data/auth/users";
import {UsersService} from "../../../services/auth/users.service";
import {GroupsService} from "../../../services/auth/groups.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CasServicesService} from "../../../services/auth/cas-services.service";

@Component({
  selector: 'app-cas-groups',
  templateUrl: './cas-groups.component.html',
  styleUrls: ['./cas-groups.component.css']
})
export class CasGroupsComponent implements OnInit {
  restricted: string[];
  allowed: string[];

  restrictAdd: string;
  restricting: boolean;
  allowAdd: string;
  allowing: boolean;

  constructor(private service: CasServicesService,
              private dialogRef: MatDialogRef<CasGroupsComponent>,
              private snack: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public serviceId: number) {
  }

  ngOnInit(): void {
    this.service.getServiceData(this.serviceId)
      .subscribe(data => {
        this.restricted = data.requiredGroups;
        this.allowed = data.allowedGroups;
      });
  }

  restrict() {
    if (this.restricting) {
      return;
    }
    this.restricting = true;

    this.service.addRequiredGroup(this.serviceId, this.restrictAdd)
      .subscribe(succ => {
        this.restricted.push(this.restrictAdd);
        this.restrictAdd = '';
        this.restricting = false;
      }, err => {
        this.restricting = false;
        this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.restrict());
      });
  }

  removeRestricted(group: string) {
    this.restricted.splice(this.restricted.indexOf(group), 1);
    this.service.deleteRequiredGroup(this.serviceId, group)
      .subscribe(
        succ => {},
        err => {
          this.restricted.push(group);
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.removeRestricted(group));
        }
      )
  }


  allow() {
    if (this.allowing) {
      return;
    }
    this.allowing = true;

    this.service.addAllowedGroups(this.serviceId, this.allowAdd)
      .subscribe(succ => {
        this.allowed.push(this.allowAdd);
        this.allowAdd = '';
        this.allowing = false;
      }, err => {
        this.allowing = false;
        this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.allow());
      });
  }

  removeAllowed(group: string) {
    this.allowed.splice(this.allowed.indexOf(group), 1);
    this.service.deleteAllowedGroups(this.serviceId, group)
      .subscribe(
        succ => {},
        err => {
          this.allowed.push(group);
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.removeAllowed(group));
        }
      )
  }

}
