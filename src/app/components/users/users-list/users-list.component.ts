import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../../services/auth/users.service";
import {UserProfile} from "../../../data/auth/users";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UserProfileComponent} from "../user-profile/user-profile.component";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: MatTableDataSource<UserProfile> = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  columns = ['id', 'email', 'firstName', 'lastName', 'actions'];



  constructor(private service: UsersService, private dialog: MatDialog) {
  }

  dataAccessor(data: UserProfile, col: string) {
    switch (col) {
      case 'lastName': return data.details.lastName;
      case 'firstName': return data.details.firstName;
      case 'email': return data.email;
      case 'id': return data.id;
    }
  }

  ngOnInit() {
    this.users.sort = this.sort;
    this.users.sortingDataAccessor = this.dataAccessor;
    this.users.paginator = this.paginator;

    this.users.filterPredicate = (data: UserProfile, f: string) => {
      if (!f) {
        return true;
      }

      const val = this.columns.map(c => this.dataAccessor(data, c)).join(' ');
      return val.includes(f);
    };

    this.refresh();
  }

  refresh() {
    this.service.getUsers().subscribe(users => this.users.data = users);
  }

  update(id: number) {
    //this.dialog.open(UpdateAccredModalComponent, {data: id});
  }

  view(element: UserProfile) {
    this.dialog.open(UserProfileComponent, {data: element.id});
  }

}
