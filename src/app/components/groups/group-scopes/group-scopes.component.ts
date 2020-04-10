import {Component, Inject, OnInit} from '@angular/core';
import {GroupsService} from "../../../services/auth/groups.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-group-scopes',
  templateUrl: './group-scopes.component.html',
  styleUrls: ['./group-scopes.component.css']
})
export class GroupScopesComponent implements OnInit {
  scopes: string[];
  scopeToAdd: string;
  addingScope: boolean;

  constructor(private groups: GroupsService,
              private dialogRef: MatDialogRef<GroupScopesComponent>,
              @Inject(MAT_DIALOG_DATA) public group: string,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.groups.getGroup(this.group)
      .subscribe(
        succ => this.scopes = succ.allowedScopes,
        err => {
          this.snack.open(err, "Fermer", {duration: 5000});
          this.dialogRef.close();
        }
      );

    this.dialogRef.beforeClosed().subscribe(e => this.groups.refreshGroups());
  }

  addScope() {
    if (this.addingScope) {
      return;
    }
    this.addingScope = true;

    const scope = this.scopeToAdd;
    this.groups.addScope(this.group, scope)
      .subscribe(succ => {
        this.scopes.push(scope);
        this.scopeToAdd = '';
        this.addingScope = false;
      }, err => {
        this.addingScope = false;
        this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.addScope());
      });
  }

  removeScope(scope: string) {
    this.scopes.splice(this.scopes.indexOf(scope), 1);
    this.groups.removeScope(this.group, scope)
      .subscribe(
        succ => {},
        err => {
          this.scopes.push(scope);
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.removeScope(scope));
        }
      )
  }
}
