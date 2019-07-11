import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {
  countries = new Array<Country>();
  subscription: any;
  constructor(private service: CountryService) {
  }

  ngOnInit() {
    this.countries = [];
    this.subscription = this.service.loadCountries().subscribe(x => this.loadCountries(x));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCountries(countries : any){
         console.log(countries);
         this.countries.push(...countries);
  }
}
