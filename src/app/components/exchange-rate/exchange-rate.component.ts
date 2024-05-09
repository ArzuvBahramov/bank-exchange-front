import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ExchangeRate} from "../../model/exchange-rate.model";
import {ExchangeRateService} from "../../services/data/exchange-rate/exchange-rate.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrl: './exchange-rate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeRateComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'code', 'rate', 'rate_date'];
  dataSource!: ExchangeRate[];
  private destroy$!: Subject<void>;

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this.loadData();
  }
  constructor(private exchangeRateService: ExchangeRateService) {
  }

  loadData() {
    this.exchangeRateService.getExchangers().pipe(takeUntil(this.destroy$)).subscribe(
        (response) => {
          this.dataSource = Array.from(response)
          console.log(this.dataSource);
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
