import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ExchangeRate} from "../../model/exchange-rate.model";
import {ExchangeRateService} from "../../services/data/exchange-rate/exchange-rate.service";
import {Subject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrl: './exchange-rate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeRateComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'code', 'rate', 'rate_date'];
  dataSource = new MatTableDataSource<ExchangeRate>([]);
  private destroy$!: Subject<void>;
  @Output() exchangeRateCodes = new EventEmitter<string[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this.loadData();
  }
  constructor(private exchangeRateService: ExchangeRateService) {
  }

  loadData() {
    this.exchangeRateService.getExchangers().pipe(takeUntil(this.destroy$)).subscribe(
        (response) => {
          let data = Array.from(response);
          this.dataSource.data = data;
          this.exchangeRateCodes.emit(data.map((exchange) => exchange.code));
          this.dataSource.paginator = this.paginator;
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
