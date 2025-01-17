import { Component, OnInit, Input } from '@angular/core';
import { CurrencyTablePod, DB_CurrencyTable } from '../../../defs/cdclient';
import { LuJsonService } from '../../services';

@Component({
  selector: 'lux-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css']
})
export class CurrencyTableComponent implements OnInit {

  currency_table: DB_CurrencyTable[];
  currency_index: number;

  @Input() level?: number = 0;

  @Input() set id(value: number) {
    this.currency_index = value;
    this.getCurrencyIndex(value);
  }

  get id() {
    return this.currency_index;
  }

  constructor(private luJsonService: LuJsonService) { }

  ngOnInit() {
  }

  getCurrencyIndex(id: number) {
    this.luJsonService
      .getCurrencyIndex(id)
      .subscribe(this.processCurrencyIndex.bind(this))
  }

  processCurrencyIndex(table: CurrencyTablePod) {
    this.currency_table = table.currency_table;
  }
}
