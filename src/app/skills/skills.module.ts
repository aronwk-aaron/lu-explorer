import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilModule } from '../util/util.module';

import { BehaviorComponent } from './behavior/behavior.component';
import { BehaviorDetailComponent } from './behavior-detail/behavior-detail.component';
import { BehaviorDetailAltComponent } from './behavior-detail-alt/behavior-detail-alt.component';
import { SkillComponent } from './skill/skill.component';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { DescriptionUiComponent } from './description-ui/description-ui.component';
import { TasksModule } from '../missions/tasks/tasks.module';
import { GuiModule } from '../gui/gui.module';

@NgModule({
  declarations: [
    BehaviorComponent,
    BehaviorDetailComponent,
    BehaviorDetailAltComponent,
    SkillComponent,
    SkillsComponent,
    DescriptionUiComponent
  ],
  imports: [
    CommonModule,
    GuiModule,
    UtilModule,
    TasksModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
