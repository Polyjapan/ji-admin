import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../../../services/auth/users.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GroupsService} from "../../../services/auth/groups.service";
import {UserProfile} from "../../../data/auth/users";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserProfileComponent} from "../../users/user-profile/user-profile.component";

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {
  members: UserProfile[];

  constructor(private groups: GroupsService,
              private dialogRef: MatDialogRef<GroupMembersComponent>,
              @Inject(MAT_DIALOG_DATA) public group: string,
              private snack: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.groups.getMembers(this.group)
      .subscribe(
        succ => this.members = succ.sort((a, b) => a.id - b.id),
        err => {
          this.snack.open(err, "Fermer", {duration: 5000});
          this.dialogRef.close();
        }
      )
  }

  openProfile(user: number) {
    this.dialog.open(UserProfileComponent, {data: user});
  }
}
