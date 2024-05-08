import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConversionService} from "../../services/data/conversion/conversion.service";
import {ConversionRequest} from "../../model/request/conversion.request";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Conversion} from "../../model/conversion.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css'
})
export class ConversionComponent {
  formConversionRequest: FormGroup;
  isNotValidData: boolean = false;
  isHistoryTableAvailable: boolean = false;
  displayedColumns: string[] = ['index', 'fromConversion', 'toConversion', 'fromValue', 'toValue', 'rateDate', 'user']
  dataSource = new MatTableDataSource<Conversion>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private fb: FormBuilder,
              private conversionService: ConversionService) {
    this.formConversionRequest = this.fb.group({
      currencyFrom: new FormControl('', [Validators.required]),
      currencyTo: new FormControl('', [Validators.required]),
      fromValue: new FormControl('', [Validators.required]),
      toValue: new FormControl('')
    });
  }

  onSubmit() {
    if (this.formConversionRequest.valid) {
      const conversionRequest: ConversionRequest = {
        currencyFro: this.formConversionRequest.get('currencyFrom')?.value,
        currencyTo: this.formConversionRequest.get('currencyTo')?.value,
        fromValue: Number.parseFloat(this.formConversionRequest.get('fromValue')?.value)
      };

      this.conversionService.convert(conversionRequest).subscribe({
        next: (response) => {
          let result = response.toValue;
          this.formConversionRequest.get('toValue')?.setValue(result);
        },
        error: (err) => {
          // console.log(err);
        }
      })
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

  loadHistory(page: number, size: number) {
    this.conversionService.getHistoryConversions(0, { page: page, size: size }).subscribe(data => {
      this.dataSource.data = data.content;
      if (this.paginator) {
        this.paginator.length = data.totalElements;
      }
    });
  }

  changePage(event: PageEvent) {
    this.loadHistory(event.pageIndex, event.pageSize )
  }
}
