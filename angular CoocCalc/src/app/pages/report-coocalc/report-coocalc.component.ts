import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-report-coocalc',
  templateUrl: './report-coocalc.component.html',
  styles: [
  ]
})
export class ReportCoocalcComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

    //initializing the report
    libMJ8.MJ8Report();
  }

}
