import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SimpleEvent} from "../../../data/events/event";
import {EventsService} from "../../../services/events/events.service";
import {Visibilities, Visibility} from "../../../data/events/visibility";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  event: SimpleEvent;
  sending = false;
  Visibility = Visibilities;

  constructor(private events: EventsService,
              private dialogRef: MatDialogRef<EventCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public id: number,
              private snack: MatSnackBar) {

    if (!this.id) {
      this.event = new SimpleEvent();
      this.event.isMainstream = true;
      this.event.isTest = false;
      this.event.visibility = Visibility.Draft;
    }
  }

  ngOnInit(): void {
    if (this.id) this.events.getEvent(this.id)
      .subscribe(
        succ => this.event = succ.event,
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

    const obs = this.id ? this.events.updateEvent(this.id, this.event) : this.events.createEvent(this.event);

    obs.subscribe(
        succ => {
          this.snack.open("Événement " + (this.id ? 'modifié' : 'créé') + ' !', "Ok", {duration: 5000});
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
