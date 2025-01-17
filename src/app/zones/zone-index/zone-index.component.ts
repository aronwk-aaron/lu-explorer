import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DB_ZoneTable } from '../../../defs/cdclient';
import { Locale_ZoneTable } from '../../../defs/locale';
import { LuJsonService } from '../../services';
import { LuCoreDataService } from '../../util/services/lu-core-data.service';

@Component({
  selector: 'app-zone-index',
  templateUrl: './zone-index.component.html',
  styleUrls: ['./zone-index.component.css']
})
export class ZoneIndexComponent implements OnInit {

  $zones: Observable<{[key: string]: Locale_ZoneTable}>;

  constructor(
    private luCoreData: LuCoreDataService,
    private luJsonService: LuJsonService) { }

  ngOnInit() {
    this.$zones = this.luCoreData.getLocaleSubtree<Locale_ZoneTable>('ZoneTable');
  }

  zones: DB_ZoneTable[];

  getZones(): void {
    this.luJsonService.getZones().subscribe(zones => this.zones = zones);
  }

}
