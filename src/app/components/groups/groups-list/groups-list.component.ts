import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserProfile} from "../../../data/auth/users";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UserProfileComponent} from "../../users/user-profile/user-profile.component";
import {Group, GroupData} from "../../../data/auth/groups";
import {GroupsService} from "../../../services/auth/groups.service";
import {config, Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupMembersComponent} from "../group-members/group-members.component";
import {GroupEditComponent} from "../group-edit/group-edit.component";
import {GroupScopesComponent} from "../group-scopes/group-scopes.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit, OnDestroy {
  groups: MatTableDataSource<GroupData> = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  columns = ['id', 'name', 'displayName', 'scopes', 'actions'];
  private subscription: Subscription;
  createGroup: Group = new Group();
  creatingGroup: boolean;


  constructor(private service: GroupsService, private dialog: MatDialog, private snack: MatSnackBar) {
  }

  dataAccessor(data: GroupData, col: string) {
    switch (col) {
      case 'scopes':
        return data.allowedScopes.join(', ');
      case 'displayName':
        return data.group.displayName;
      case 'name':
        return data.group.name;
      case 'id':
        return data.group.id;
    }
  }

  ngOnInit() {
    this.groups.sort = this.sort;
    this.groups.sortingDataAccessor = this.dataAccessor;
    this.groups.paginator = this.paginator;

    this.groups.filterPredicate = (data: GroupData, f: string) => {
      return !f || this.columns.map(c => this.dataAccessor(data, c)).join(' ').includes(f);
    };

    this.subscription = this.service.getGroups().subscribe(g => this.groups.data = g);
  }

  refresh() {
    this.service.refreshGroups();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitGroup() {
    if (this.creatingGroup) {
      return;
    }
    this.creatingGroup = true;
    this.service.createGroup(this.createGroup)
      .subscribe(succ => {
        this.createGroup = new Group();
        this.snack.open("Le groupe a bien été créé !", "Ok", {duration: 5000, horizontalPosition: "right"});
        this.service.pullGroups().subscribe(succ => this.creatingGroup = false);
      }, err => {
        this.creatingGroup = false;
        this.snack.open(err, "Réessayer", {duration: 5000, horizontalPosition: "right"}).onAction().subscribe(e => this.submitGroup());
      })
  }

  edit(name: string) {
    this.dialog.open(GroupEditComponent, {data: name});
  }

  members(name: string) {
    this.dialog.open(GroupMembersComponent, {data: name});
  }

  scopes(name: string) {
    this.dialog.open(GroupScopesComponent, {data: name});
  }

  delete(name: string) {
    Swal.fire({
      titleText: 'Voulez vous vraiment supprimer ce groupe ?',
      text: 'Si une application utilise ce groupe, elle risque de cesser de fonctionner.',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      showCancelButton: true,
      showConfirmButton: true
    }).then(res => {
      if (res.value === true) {
        this.service.deleteGroup(name)
          .subscribe(ok => this.refresh(),
            err =>
              this.snack.open(err, 'Réessayer', {duration: 5000})
                .onAction()
                .subscribe(_ => this.delete(name)))
      }
    });
  }

}
