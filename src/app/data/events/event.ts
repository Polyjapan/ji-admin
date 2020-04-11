import {Visibility} from "./visibility";

export class SimpleEvent {
  id?: number;
  name: string;
  location: string;
  visibility: Visibility;
  start: Date;
  end: Date;
  archive: Date;
  isTest: boolean;
  isMainstream: boolean
}


export class Event {
  event: SimpleEvent;
  attributes: {}; // Map<string, string>;
}
