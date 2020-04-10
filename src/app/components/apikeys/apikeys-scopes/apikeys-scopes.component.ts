import {Component, Inject, OnInit} from '@angular/core';
import {GroupsService} from "../../../services/auth/groups.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApikeysService} from "../../../services/auth/apikeys.service";

@Component({
  selector: 'app-apikeys-scopes',
  templateUrl: './apikeys-scopes.component.html',
  styleUrls: ['./apikeys-scopes.component.css']
})
export class ApikeysScopesComponent implements OnInit {
  scopes: string[];
  scopeToAdd: string;
  addingScope: boolean;

  constructor(private service: ApikeysService,
              private dialogRef: MatDialogRef<ApikeysScopesComponent>,
              @Inject(MAT_DIALOG_DATA) public apiKey: number,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.service.getScopes(this.apiKey)
      .subscribe(
        succ => this.scopes = succ,
        err => {
          this.snack.open(err, "Fermer", {duration: 5000});
          this.dialogRef.close();
        }
      );
  }

  addScope() {
    if (this.addingScope) {
      return;
    }
    this.addingScope = true;

    const scope = this.scopeToAdd;
    this.service.addScope(this.apiKey, scope)
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
    this.service.removeScope(this.apiKey, scope)
      .subscribe(
        succ => {},
        err => {
          this.scopes.push(scope);
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.removeScope(scope));
        }
      )
  }
}
