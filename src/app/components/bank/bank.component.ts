import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ExchangeRate} from "../../model/exchange-rate.model";

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankComponent {
  exchangeRateCodesData: string[] = [];

  exchangeRateCodesEvent(data: string[]) {
    this.exchangeRateCodesData = data;
  }
}
