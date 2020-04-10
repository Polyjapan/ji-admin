import {Component, Inject, OnInit} from '@angular/core';
import {GroupData} from "../../../data/auth/groups";
import {GroupsService} from "../../../services/auth/groups.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApikeysService} from "../../../services/auth/apikeys.service";

@Component({
  selector: 'app-apikeys-edit',
  templateUrl: './apikeys-edit.component.html',
  styleUrls: ['./apikeys-edit.component.css']
})
export class ApikeysEditComponent implements OnInit {
  sending = false;

  constructor(private service: ApikeysService,
              private dialogRef: MatDialogRef<ApikeysEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {name: string, id: number},
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.sending) {
      return;
    }
    this.sending = true;

    this.service.updateApiKey(this.data.id, this.data.name)
      .subscribe(
        succ => {
          this.snack.open("Clé d'API modifiée !", "Ok", {duration: 5000});
          this.dialogRef.close();
        },
        err => {
          this.sending = false;
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction()
            .subscribe(_ => this.submit())
        }
      )
  }
}
