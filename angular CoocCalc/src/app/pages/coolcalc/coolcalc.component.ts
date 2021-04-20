import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coolcalc',
  templateUrl: './coolcalc.component.html',
  styles: []
})
export class CoolcalcComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {

    //initializing CooCalc
    libMJ8.landingPage(myFunFactory);    
  }


}
