import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ConversionService} from "../../services/data/conversion/conversion.service";
import {ConversionRequest} from "../../model/request/conversion.request";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Conversion} from "../../model/conversion.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ConversionFilterRequest} from "../../model/request/conversion.filter.request";
import {DatePipe, formatNumber} from "@angular/common";
import {map, Observable, of, startWith, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionComponent implements OnInit, OnChanges, OnDestroy{
  formConversionRequest!: FormGroup;
  filterRequest!: FormGroup;
  fromReqFilteredOptions!: Observable<string[]>;
  toReqFilteredOptions!: Observable<string[]>;
  fromSearchFilteredOptions!: Observable<string[]>;
  toSearchFilteredOptions!: Observable<string[]>;

  isHistoryTableAvailable: boolean = false;
  displayedColumns: string[] = ['index', 'fromConversion', 'toConversion', 'fromValue', 'toValue', 'rateDate', 'user', 'createAt']
  dataSource = new MatTableDataSource<Conversion>([]);
  @Input() exchangeRateData: string[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  convertedValue?: number = 0.000;

  ngOnInit(): void {
    this.formConversionRequest = this.fb.group({
      currencyFrom: new FormControl('', [Validators.required]),
      currencyTo: new FormControl('', [Validators.required]),
      fromValue: new FormControl('', [Validators.required]),
      toValue: new FormControl('')
    });
    this.filterRequest = this.fb.group({
      from: new FormControl(''),
      to: new FormControl(''),
      username: new FormControl(''),
      dateRequest: new FormControl(''),
    });
  }

  constructor(private fb: FormBuilder,
              private conversionService: ConversionService,
              public formatDate: DatePipe) {
  }

  onSubmit() {
    if (this.formConversionRequest.valid) {
      const conversionRequest = this.getConversionRequest();
      this.conversionService.convert(conversionRequest).pipe(takeUntil(this.destroy$))
          .subscribe((response) => this.formConversionRequest.get('toValue')?.setValue(response.toValue))
    }
  }

  private getConversionRequest() {
    const conversionRequest: ConversionRequest = {
      currencyFrom: this.formConversionRequest.get('currencyFrom')?.value,
      currencyTo: this.formConversionRequest.get('currencyTo')?.value,
      fromValue: Number.parseFloat(this.formConversionRequest.get('fromValue')?.value)
    };
    return conversionRequest;
  }

  showHistory() {
    this.isHistoryTableAvailable = !this.isHistoryTableAvailable;
    if (this.isHistoryTableAvailable) {
      const page = this.dataSource.paginator?.pageIndex || 0;
      const size = this.dataSource.paginator?.pageSize || 5;
      this.loadHistory(page, size);
    }
  }

  loadHistory(page: number, size: number, filterRequest?: ConversionFilterRequest) {
    this.conversionService.getHistoryConversions({ page: page, size: size }, filterRequest).pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
            this.dataSource.data = data.content;
            if (this.paginator) {
              this.paginator.length = data.totalElements;
            }
    });
  }

  onSubmitFilter() {
    const page = this.dataSource.paginator?.pageIndex || 0;
    const size = this.dataSource.paginator?.pageSize || 5;
    this.loadHistory(page, size, this.getFilterAttributes());
  }

  getFilterAttributes():ConversionFilterRequest {
    var filterConversionRequest: ConversionFilterRequest = this.filterRequest.getRawValue();
    if (filterConversionRequest.dateRequest) {
      filterConversionRequest.dateRequest = this.formatDate.transform(filterConversionRequest.dateRequest, 'yyyy-MM-dd') || '';
    }
    return filterConversionRequest;

  }

  changePage(event: PageEvent) {
    this.loadHistory(event.pageIndex, event.pageSize, this.getFilterAttributes())
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.exchangeRateData.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('exchangeRateData' in changes) {
      this.autoCompleteSelectorField();
    }
  }

  autoCompleteSelectorField() {
    this.fromReqFilteredOptions = of(this.exchangeRateData).pipe(
        map(data => data)
    );
    this.fromReqFilteredOptions = this.formConversionRequest.controls['currencyFrom']?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
    );
    this.toReqFilteredOptions = of(this.exchangeRateData).pipe(
        map(data => data)
    );
    this.toReqFilteredOptions = this.formConversionRequest.controls['currencyTo']?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
    );
    this.fromSearchFilteredOptions = of(this.exchangeRateData).pipe(
        map(data => data)
    );
    this.fromSearchFilteredOptions = this.filterRequest.controls['from']?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
    );
    this.toSearchFilteredOptions = of(this.exchangeRateData).pipe(
        map(data => data)
    );
    this.toSearchFilteredOptions = this.filterRequest.controls['to']?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
    );
  }

  protected readonly formatNumber = formatNumber;
}
