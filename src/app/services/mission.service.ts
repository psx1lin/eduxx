import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor() { }

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
    console.log(`MissionService announceMission:${mission}`);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
    console.log(`MissionService confirmMission:${astronaut}`);
  }

}
