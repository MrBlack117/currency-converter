import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CurrencyRateService} from "./shared/services/currency-rate.service";
import {exchangeRate} from "./shared/interfaces";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'currency-converter';
  currencyRates: exchangeRate[] = [];
  currency1: number = 0;
  currency2: number = 25;
  value1: string = '';
  value2: string = '';

  constructor(private currencyRateService: CurrencyRateService) {
  }

  ngOnInit() {
    this.currencyRateService.gerRates().subscribe({
        next: (currencyRates: exchangeRate[]) => {
          this.currencyRates = currencyRates;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {                  // adding hryvnia to dataset, because nbu api does not have it as a separate element
          this.currencyRates.unshift({
            r030: 980,
            txt: 'Українська гривня',
            rate: 1,
            cc: 'UAH',
            exchangedate: this.currencyRates[0].exchangedate
          })
        }
      }
    )
  }

  calculateCurrency(firstInput: boolean) {
    let rate1 = this.currencyRates[this.currency1].rate // rate to hryvnia
    let rate2 = this.currencyRates[this.currency2].rate
    if (firstInput) {
      this.value2 = (+this.value1 * (rate1 / rate2)).toFixed(4);
    } else {
      this.value1 = (+this.value2 * (rate2 / rate1)).toFixed(4);
    }

  }

}
