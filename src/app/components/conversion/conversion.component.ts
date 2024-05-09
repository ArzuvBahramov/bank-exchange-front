import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConversionService} from "../../services/data/conversion/conversion.service";
import {ConversionRequest} from "../../model/request/conversion.request";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Conversion} from "../../model/conversion.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ConversionFilterRequest} from "../../model/request/conversion.filter.request";
import {DatePipe} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionComponent implements OnInit, OnDestroy{
  formConversionRequest!: FormGroup;
  filterRequest!: FormGroup;
  isNotValidData: boolean = false;
  isHistoryTableAvailable: boolean = false;
  displayedColumns: string[] = ['index', 'fromConversion', 'toConversion', 'fromValue', 'toValue', 'rateDate', 'user', 'createAt']
  dataSource = new MatTableDataSource<Conversion>([]);
  private destroy$!: Subject<void>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
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
      requestData: new FormControl(''),
    });
  }

  constructor(private fb: FormBuilder,
              private conversionService: ConversionService,
              public formatDate: DatePipe) {
  }

  onSubmit() {
    if (this.formConversionRequest.valid) {
      const conversionRequest: ConversionRequest = {
        currencyFro: this.formConversionRequest.get('currencyFrom')?.value,
        currencyTo: this.formConversionRequest.get('currencyTo')?.value,
        fromValue: Number.parseFloat(this.formConversionRequest.get('fromValue')?.value)
      };

      this.conversionService.convert(conversionRequest).pipe(takeUntil(this.destroy$))
          .subscribe((response) => this.formConversionRequest.get('toValue')?.setValue(response.toValue))
    }
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
    var filterConversionRequest: ConversionFilterRequest = {
      from: this.filterRequest.get('from')?.value || '',
      to: this.filterRequest.get('to')?.value || '',
      username: this.filterRequest.get('username')?.value || '',
      dateRequest: this.filterRequest.get('requestData')?.value || '',
    }
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
}
