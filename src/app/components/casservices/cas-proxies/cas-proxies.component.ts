import {Component, Inject, OnInit} from '@angular/core';
import {CasServicesService} from "../../../services/auth/cas-services.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cas-proxies',
  templateUrl: './cas-proxies.component.html',
  styleUrls: ['./cas-proxies.component.css']
})
export class CasProxiesComponent implements OnInit {
  proxies: [number, string][];

  proxyAdd: [number, string];
  adding: boolean;

  constructor(private service: CasServicesService,
              private dialogRef: MatDialogRef<CasProxiesComponent>,
              private snack: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public serviceId: number) {
  }

  ngOnInit(): void {
    this.service.getServiceData(this.serviceId)
      .subscribe(data => this.proxies = data.accessFrom);
  }

  submitProxy() {
    if (this.adding) {
      return;
    }
    this.adding = true;

    this.service.addAllowedProxy(this.serviceId, this.proxyAdd[0])
      .subscribe(succ => {
        this.proxies.push(this.proxyAdd);
        this.proxyAdd = undefined;
        this.adding = false;
      }, err => {
        this.adding = false;
        this.snack.open(err, "Réessayer", {duration: 5000})
          .onAction()
          .subscribe(_ => this.submitProxy());
      });
  }

  removeProxy(proxy: [number, string]) {
    this.proxies.splice(this.proxies.indexOf(proxy), 1);

    this.service.deleteAllowedProxy(this.serviceId, proxy[0])
      .subscribe(
        succ => {},
        err => {
          this.proxies.push(proxy);
          this.snack.open(err, "Réessayer", {duration: 5000})
            .onAction()
            .subscribe(_ => this.removeProxy(proxy));
        }
      )
  }

}
