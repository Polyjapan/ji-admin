import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CasService} from "../../../data/auth/casservices";
import {CasServicesService} from "../../../services/auth/cas-services.service";

@Component({
  selector: 'app-cas-selector',
  templateUrl: './cas-selector.component.html',
  styleUrls: ['./cas-selector.component.css']
})
export class CasSelectorComponent implements OnInit {
  @Input() label = 'Service CAS';
  @Input() selected: [number, string];
  @Output() selectedChange = new EventEmitter<[number, string]>();

  services: CasService[] = [];

  constructor(private service: CasServicesService) {
  }

  ngOnInit() {
    this.service.getServices()
      .subscribe(data => {
        this.services = data;
      });
  }

  changeValue($event: [number, string]) {
    this.selectedChange.emit($event);
  }
}
