import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CasService} from "../../../data/auth/casservices";
import {CasServicesService} from "../../../services/auth/cas-services.service";
import Swal from 'sweetalert2';
import {CasEditComponent} from "../cas-edit/cas-edit.component";
import {CasGroupsComponent} from "../cas-groups/cas-groups.component";
import {CasDomainsComponent} from "../cas-domains/cas-domains.component";
import {CasProxiesComponent} from "../cas-proxies/cas-proxies.component";

@Component({
  selector: 'app-cas-services-list',
  templateUrl: './cas-services-list.component.html',
  styleUrls: ['./cas-services-list.component.css']
})
export class CasServicesListComponent implements OnInit {
  services: MatTableDataSource<CasService> = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  columns = ['id', 'name', 'url', 'portal', 'actions'];
  private subscription: Subscription;

  constructor(private service: CasServicesService, private dialog: MatDialog, private snack: MatSnackBar) {}

  dataAccessor(data: CasService, col: string) {
    switch (col) {
      case 'url':
        return data.serviceRedirectUrl ? data.serviceRedirectUrl : '(Aucune)';
      case 'name':
        return data.serviceName;
      case 'id':
        return data.serviceId;
      case 'portal':
        if (data.servicePortalDisplay) return 'Oui, ' + data.servicePortalTitle
        else return 'Non'
    }
  }

  ngOnInit() {
    this.services.sort = this.sort;
    this.services.sortingDataAccessor = this.dataAccessor;
    this.services.paginator = this.paginator;

    this.services.filterPredicate = (data: CasService, f: string) => {
      return !f || this.columns.map(c => this.dataAccessor(data, c)).join(' ').includes(f);
    };

    this.subscription = this.service.getServices().subscribe(g => this.services.data = g);
  }

  refresh() {
    this.service.refresh();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit(service: number) {
    this.dialog.open(CasEditComponent, {data: service, minHeight: 600, minWidth: 800}).beforeClosed().subscribe(_ => this.refresh());
  }

  groups(service: number) {
    this.dialog.open(CasGroupsComponent, {data: service}).beforeClosed().subscribe(_ => this.refresh());
  }

  domains(service: number) {
    this.dialog.open(CasDomainsComponent, {data: service}).beforeClosed().subscribe(_ => this.refresh());
  }

  delete(service: number) {
    Swal.fire({
      titleText: 'Voulez vous vraiment supprimer ce service ?',
      text: 'Si une application utilise ce service, elle cessera de fonctionner.',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      showCancelButton: true,
      showConfirmButton: true
    }).then(res => {
      if (res.value === true) {
        this.service.deleteService(service)
          .subscribe(ok => this.refresh(),
            err =>
              this.snack.open(err, 'Réessayer', {duration: 5000})
                .onAction()
                .subscribe(_ => this.delete(service)))
      }
    });
  }

  proxying(service: number) {
    this.dialog.open(CasProxiesComponent, {data: service}).beforeClosed().subscribe(_ => this.refresh());
  }
}
