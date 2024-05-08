import { Component } from '@angular/core';
import {ExchangeRate} from "../../model/exchange-rate.model";
import {ExchangeRateService} from "../../services/data/exchange-rate/exchange-rate.service";

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrl: './exchange-rate.component.css'
})
export class ExchangeRateComponent {
  displayedColumns: string[] = ['index', 'code', 'rate', 'rate_date'];
  dataSource: ExchangeRate[] = [];
  constructor(private exchangeRateService: ExchangeRateService) {
    this.loadData();
  }

  loadData() {
    this.exchangeRateService.getExchangers().subscribe({
        next:(response) => {
          this.dataSource = Array.from(response);
        },
        error:(error) => {
          console.log(error);
      }
    });
  }
}
