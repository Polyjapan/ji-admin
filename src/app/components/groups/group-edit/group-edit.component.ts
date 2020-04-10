import {Component, Inject, OnInit} from '@angular/core';
import {GroupsService} from "../../../services/auth/groups.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupData} from "../../../data/auth/groups";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  group: GroupData;
  sending = false;

  constructor(private groups: GroupsService,
              private dialogRef: MatDialogRef<GroupEditComponent>,
              @Inject(MAT_DIALOG_DATA) public name: string,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.groups.pullGroup(this.name)
      .subscribe(
        succ => this.group = succ,
        err => {
          this.snack.open(err, "Fermer", {duration: 5000});
          this.dialogRef.close();
        }
      )
  }

  submitGroup() {
    if (this.sending) {
      return;
    }
    this.sending = true;

    this.groups.updateGroup(this.name, this.group.group)
      .subscribe(
        succ => {
          this.groups.refreshGroups();
          this.snack.open("Groupe modifié !", "Ok", {duration: 5000});
          this.dialogRef.close();
        },
        err => {
          this.sending = false;
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction()
            .subscribe(_ => this.submitGroup())
        }
      )
  }
}
