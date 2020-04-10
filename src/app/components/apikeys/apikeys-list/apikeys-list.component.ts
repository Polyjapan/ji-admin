import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiKeyData} from "../../../data/auth/apikeys";
import {ApikeysService} from "../../../services/auth/apikeys.service";
import Swal from 'sweetalert2';
import {ApikeysScopesComponent} from "../apikeys-scopes/apikeys-scopes.component";
import {ApikeysEditComponent} from "../apikeys-edit/apikeys-edit.component";

@Component({
  selector: 'app-apikeys-list',
  templateUrl: './apikeys-list.component.html',
  styleUrls: ['./apikeys-list.component.css']
})
export class ApikeysListComponent implements OnInit {
  apiKeys: MatTableDataSource<ApiKeyData> = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  columns = ['id', 'name', 'author', 'scopes', 'actions'];
  create: string;
  creating: boolean;

  constructor(private service: ApikeysService, private dialog: MatDialog, private snack: MatSnackBar) {
  }

  dataAccessor(data: ApiKeyData, col: string) {
    switch (col) {
      case 'scopes':
        return data.allowedScopes.join(', ');
      case 'author':
        return data.author.email + ' (' + data.author.id + ')';
      case 'name':
        return data.apiKey.appName;
      case 'id':
        return data.apiKey.appId;
    }
  }

  ngOnInit() {
    this.apiKeys.sort = this.sort;
    this.apiKeys.sortingDataAccessor = this.dataAccessor;
    this.apiKeys.paginator = this.paginator;

    this.apiKeys.filterPredicate = (data: ApiKeyData, f: string) => {
      return !f || this.columns.map(c => this.dataAccessor(data, c)).join(' ').includes(f);
    };

    this.refresh();
  }

  refresh() {
    this.service.getApiKeys().subscribe(g => this.apiKeys.data = g);
  }

  submit() {
    if (this.creating) {
      return;
    }
    this.creating = true;
    this.service.createApiKey(this.create)
      .subscribe(succ => {
        this.create = '';
        this.snack.open("La clé a bien été créée !", "Ok", {duration: 5000, horizontalPosition: "right"});
        this.creating = false;
        this.refresh();
      }, err => {
        this.creating = false;
        this.snack.open(err, "Réessayer", {
          duration: 5000,
          horizontalPosition: "right"
        }).onAction().subscribe(e => this.submit());
      })
  }

  edit(id: number) {
    this.dialog.open(ApikeysEditComponent, {data: name});
  }

  privateKey(id: number) {
    this.service.getApiKey(id)
      .subscribe(data => {
        Swal.fire('Clé d\'API', 'Votre clé est : <br><code>' + data.apiKey.clientSecret + '</code>');
      });
  }

  scopes(id: number) {
    this.dialog.open(ApikeysScopesComponent, {data: id});
  }
}
