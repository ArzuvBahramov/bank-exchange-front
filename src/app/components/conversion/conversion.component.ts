import { Component } from '@angular/core';
import {ConversionService} from "../../services/data/conversion/conversion.service";
import {ConversionRequest} from "../../model/request/conversion.request";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css'
})
export class ConversionComponent {
  formConversionRequest: FormGroup;
  isNotValidData: boolean = false;
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
          // let result = response.toValue;
          // this.formConversionRequest.setValue('toValue', result);
        },
        error: (err) => {
          // console.log(err);
        }
      })
    }
  }
}
