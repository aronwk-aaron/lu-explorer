import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DB_Missions, DB_MissionTasks } from '../../../defs/cdclient';

import { LuJsonService, LuLocaleService } from '../../services';

const CHAT_BUBBLE_KEYS: string[] = [
  "chat_state_1",
  "accept_chat_bubble",
  "chat_state_2",
  "chat_state_3",
  "chat_state_3_turnin",
  "chat_state_4",
  "chat_state_4_turnin",
];

@Component({
  selector: 'app-mission-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class MissionDetailComponent implements OnInit {

  mission: DB_Missions;
  missionLocale: any;
  tasks: any;
  tasksLocale: any;
  text: any;
  textsLocale: any;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute,
  	private luJsonService: LuJsonService, private luLuLocaleService: LuLocaleService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(map => this.getMission(+map.get('id')));
  }

  getMission(id: number):void {
  	this.id = id;
    this.luJsonService.getMission(this.id).subscribe(mission => this.mission = mission);
    this.luJsonService.getMissionTasks(this.id).subscribe(this.processMissionTasks.bind(this));
    this.luJsonService.getMissionText(this.id).subscribe(text => this.text = text);
    this.luLuLocaleService.getLocaleEntry("MissionText", this.id).subscribe(entry => this.textsLocale = entry);
    this.luLuLocaleService.getLocaleEntry("Missions", this.id).subscribe(entry => this.missionLocale = entry);
  }

  processMissionTasks(tasks: DB_MissionTasks[]) {
    let taskArray = tasks.filter(task => task);
    taskArray.forEach(task => this.luLuLocaleService
      .getLocaleEntry("MissionTasks", task.uid)
      .subscribe(entry => task.localizations = entry))
    this.tasks = taskArray;
  }

  anyChatBubble(texts: any): boolean {
    return texts.hasOwnProperty('chat_state') || texts.hasOwnProperty('accept_chat_bubble');
  }

  getChatState(texts: any, id: number): string | null {
    let prop: string | object = texts['chat_state'][id]
    if (prop) {
      return prop.hasOwnProperty('$value') ? prop['$value'] : prop;
    }
    return null;
  }

  getChatSubState(texts: any, id: number, key: string): string | null {
    let prop: string | object = texts['chat_state'][id]
    return prop ? prop[key] : undefined;
  }

}
