import { Component, OnInit } from '@angular/core';
import { Finance } from '../../models/finance';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public conversoes!: Finance;
  public reais!: number;
  public valor: Finance = {
    USD: 0,
    EUR: 0,
    ARS: 0
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData().subscribe((buyRates) => {
      this.conversoes = {
        EUR: buyRates.EUR.buy,
        USD: buyRates.USD.buy,
        ARS: buyRates.ARS.buy,
      };
    });
  }
  getData(): Observable<any> {
    let url = `https://api.hgbrasil.com/finance?format=json-cors&key=b25012a1`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.results.currencies;
      })
    );
  }

  public converte() {
    this.valor = {
      USD: Number((this.reais / this.conversoes.USD).toFixed(2)),
      EUR: Number((this.reais / this.conversoes.EUR).toFixed(2)),
      ARS: Number((this.reais / this.conversoes.ARS).toFixed(2))
    };
  }
}
