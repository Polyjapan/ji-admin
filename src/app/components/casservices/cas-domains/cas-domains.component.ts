import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CasServicesService} from "../../../services/auth/cas-services.service";

@Component({
  selector: 'app-cas-domains',
  templateUrl: './cas-domains.component.html',
  styleUrls: ['./cas-domains.component.css']
})
export class CasDomainsComponent implements OnInit {
  domains: string[];
  domainToAdd: string;
  addingDomain: boolean;

  constructor(private service: CasServicesService,
              private dialogRef: MatDialogRef<CasDomainsComponent>,
              @Inject(MAT_DIALOG_DATA) public id: number,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.service.getServiceData(this.id)
      .subscribe(
        succ => this.domains = succ.domains,
        err => {
          this.snack.open(err, "Fermer", {duration: 5000});
          this.dialogRef.close();
        }
      );
  }

  addDomain() {
    if (this.addingDomain) {
      return;
    }
    this.addingDomain = true;

    this.service.addDomain(this.id, this.domainToAdd)
      .subscribe(succ => {
        this.domains.push(this.domainToAdd);
        this.domainToAdd = '';
        this.addingDomain = false;
      }, err => {
        this.addingDomain = false;
        this.snack.open(err, "Réessayer", {duration: 5000}).onAction().subscribe(_ => this.addDomain());
      });
  }

  removeDomain(domain: string) {
    this.domains.splice(this.domains.indexOf(domain), 1);
    this.service.deleteDomain(this.id, domain)
      .subscribe(
        succ => {
        },
        err => {
          this.domains.push(domain);
          this.snack.open(err, "Réessayer", {duration: 5000}).onAction()
            .subscribe(_ => this.removeDomain(domain));
        }
      )
  }
}
