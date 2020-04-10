import {Component, EventEmitter, Input, OnChanges, OnInit, Output, Predicate, SimpleChanges} from '@angular/core';
import {isNumber} from "util";
import {GroupsService} from "../../../services/auth/groups.service";
import {Group, GroupData} from "../../../data/auth/groups";

@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})
export class GroupSelectorComponent implements OnInit {
  @Input() label = 'Groupe';
  @Input() selected: string;
  @Output() selectedChange = new EventEmitter<string>();

  groups: Group[] = [];

  constructor(private service: GroupsService) {
  }

  ngOnInit() {
    this.service.getGroups()
      .subscribe(data => {
        this.groups = data.map(g => g.group);
      });
  }

  changeValue($event) {
    this.selectedChange.emit($event);
  }
}
