import {Component, Inject, OnInit} from '@angular/core';
import {GroupData} from "../../../data/auth/groups";
import {GroupsService} from "../../../services/auth/groups.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CasService} from "../../../data/auth/casservices";
import {CasServicesService} from "../../../services/auth/cas-services.service";

@Component({
  selector: 'app-cas-edit',
  templateUrl: './cas-edit.component.html',
  styleUrls: ['./cas-edit.component.css']
})
export class CasEditComponent implements OnInit {
  service: CasService;
  sending = false;

  constructor(private services: CasServicesService,
              private dialogRef: MatDialogRef<CasEditComponent>,
              @Inject(MAT_DIALOG_DATA) public serviceId: number,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.services.getService(this.serviceId)
      .subscribe(
        succ => {
          this.service = succ;
        },
        err => {
          this.snack.open(err, "Fermer", {duration: 5000});
          this.dialogRef.close();
        }
      )
  }

  submit() {
    if (this.sending) {
      return;
    }
    this.sending = true;

    this.services.updateService(this.serviceId, this.service)
      .subscribe(
        succ => {
          this.services.refresh();
          this.snack.open("Service modifié !", "Ok", {duration: 5000});
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
