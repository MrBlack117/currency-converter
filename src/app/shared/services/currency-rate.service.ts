import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {exchangeRate} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  constructor(private _httpClient: HttpClient) {
  }

  gerRates(): Observable<exchangeRate[]> {
    return this._httpClient.get<exchangeRate[]>(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?.json`)
  }

}
