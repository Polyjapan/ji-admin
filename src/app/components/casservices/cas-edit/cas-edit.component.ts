import {Component, Inject, OnInit} from '@angular/core';
import {GroupData} from "../../../data/auth/groups";
import {GroupsService} from "../../../services/auth/groups.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CasService} from "../../../data/auth/casservices";
import {CasServicesService} from "../../../services/auth/cas-services.service";
import {Observable} from "rxjs";
import {map, mapTo} from "rxjs/operators";

@Component({
  selector: 'app-cas-edit',
  templateUrl: './cas-edit.component.html',
  styleUrls: ['./cas-edit.component.css']
})
export class CasEditComponent implements OnInit {
  service: CasService;
  sending = false;
  creating = false;

  constructor(private services: CasServicesService,
              private dialogRef: MatDialogRef<CasEditComponent>,
              @Inject(MAT_DIALOG_DATA) public serviceId: number,
              private snack: MatSnackBar) {
    this.creating = this.serviceId === 0;
  }

  ngOnInit(): void {
    if (this.serviceId !== 0) {
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
    } else {
      this.service = new CasService();
    }
  }

  submit(form: HTMLFormElement) {
    if (!form.checkValidity()) return;

    if (this.sending) {
      return;
    }
    this.sending = true;

    const req = this.creating ? this.services.createService(this.service).pipe(map(e => {return;})) : this.services.updateService(this.serviceId, this.service)

    req.subscribe(_ => {
          this.services.refresh();
          this.snack.open("Le service a bien été " + (this.creating ? "créé":"modifié") + " !", "Ok", {duration: 5000});
          this.dialogRef.close();
        },
        err => {
          this.sending = false;
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction()
            .subscribe(_ => this.submit(form))
        }
      )
  }
}
