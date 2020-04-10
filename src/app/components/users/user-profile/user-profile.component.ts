import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../../../services/auth/users.service";
import {UserData} from "../../../data/auth/users";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GroupsService} from "../../../services/auth/groups.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupScopesComponent} from "../../groups/group-scopes/group-scopes.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: UserData;
  scopeToAdd: string;
  addingScope: boolean;
  groupToAdd: string;
  addingToGroup: boolean;

  constructor(private users: UsersService, private groups: GroupsService,
              private dialogRef: MatDialogRef<UserProfileComponent>,
              private snack: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public userId: number) {
  }

  ngOnInit(): void {
    this.users.getUser(this.userId).subscribe(user => {
      this.profile = user
    });
  }

  filterGroup(): string[] {
    if (!this.profile) return [];
    else return this.profile.groups;
  }

  addScope() {
    if (this.addingScope) {
      return;
    }
    this.addingScope = true;

    const scope = this.scopeToAdd;
    this.users.addScope(this.userId, scope)
      .subscribe(succ => {
        this.profile.scopes.push(scope);
        this.scopeToAdd = '';
        this.addingScope = false;
      }, err => {
        this.addingScope = false;
        this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.addScope());
      });
  }

  removeScope(scope: string) {
    this.profile.scopes.splice(this.profile.scopes.indexOf(scope), 1);
    this.users.deleteScope(this.userId, scope)
      .subscribe(
        succ => {
        },
        err => {
          this.profile.scopes.push(scope);
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.removeScope(scope));
        }
      )
  }

  addToGroup() {
    if (this.profile && this.profile.groups.includes(this.groupToAdd)) {
      this.snack.open('L\'utilisateur est déjà dans ce groupe.', undefined, {duration: 5000});
      this.groupToAdd = '';
      return;;
    }

    if (this.addingToGroup) {
      return;
    }
    this.addingToGroup = true;

    const group = this.groupToAdd;
    this.groups.addMember(group, this.userId)
      .subscribe(succ => {
        this.profile.groups.push(group);
        this.groupToAdd = '';
        this.addingToGroup = false;
      }, err => {
        this.addingToGroup = false;
        this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.addToGroup());
      });
  }

  removeGroup(group: string) {
    this.profile.groups.splice(this.profile.groups.indexOf(group), 1);
    this.groups.removeMember(group, this.userId)
      .subscribe(
        succ => {
        },
        err => {
          this.profile.groups.push(group);
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.removeGroup(group));
        }
      )
  }
}
