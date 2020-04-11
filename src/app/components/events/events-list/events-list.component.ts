import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Event} from "../../../data/events/event";
import {EventsService} from "../../../services/events/events.service";
import {EventAttributesListComponent} from "../event-attributes-list/event-attributes-list.component";
import {EventCreateComponent} from "../event-create/event-create.component";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: MatTableDataSource<Event> = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  columns = ['id', 'name', 'location', 'start', 'end', 'archive', 'props', 'visibility', 'actions'];

  constructor(private service: EventsService, private dialog: MatDialog, private snack: MatSnackBar) {
  }

  dataAccessor(data: Event, col: string) {
    switch (col) {
      case 'props':
        const props = [];
        if (data.event.isTest) props.push("Test")
        if (data.event.isMainstream) props.push("Mainstream")
        return props.join(', ')
      case 'start':
        return this.dateAsString(data.event.start);
      case 'end':
        return this.dateAsString(data.event.end);
      case 'archive':
        return this.dateAsString(data.event.archive);
      case 'visibility':
        return data.event.visibility;
      case 'location':
        return data.event.location;
      case 'name':
        return data.event.name;
      case 'id':
        return data.event.id;
    }
  }

  ngOnInit() {
    this.events.sort = this.sort;
    this.events.sortingDataAccessor = this.dataAccessor;
    this.events.paginator = this.paginator;

    this.events.filterPredicate = (data: Event, f: string) => {
      return !f || this.columns.map(c => this.dataAccessor(data, c)).join(' ').includes(f);
    };

    this.refresh();
  }

  refresh() {
    this.service.getEvents().subscribe(g => this.events.data = g, err => {
      this.snack.open('Erreur de chargement : ' + err, 'Réessayer', {duration: 5000}).onAction().subscribe(_ => this.refresh());
    });
  }

  edit(event: Event) {
    this.dialog.open(EventCreateComponent, {data: event.event.id}).beforeClosed().subscribe(_ => this.refresh());
  }

  create() {
    this.dialog.open(EventCreateComponent).beforeClosed().subscribe(_ => this.refresh());
  }

  attributes(event: Event) {
    this.dialog.open(EventAttributesListComponent, {data: event.attributes})
  }

  private dateAsString(date: string | Date): string {
    if (typeof date === 'string') return date as string;
    else return (date as Date).toISOString();
  }


}
