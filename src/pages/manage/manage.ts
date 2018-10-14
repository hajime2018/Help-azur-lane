import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage{
  Manage:string = "money";
  moneyTable = new Array(['time','money']);
  fuelTable = new Array(['time','fuel']);

  constructor(private storage: Storage){

  }

  ionViewWillEnter() {
    this.storage.get('num_manage').then(val => {
      console.log(val);
      if(val>0){
        let i;
        console.log(val);
        for(i = 1; i <= val; i++){
          console.log(i);
          this.storage.get(String(i)).then(val => {
            this.moneyTable.push([val.time, val.money]);
            this.fuelTable.push([val.time, val.fuel])
          });
        }
      }
    })
  }
  moneyLineChartData =  {
    chartType: 'LineChart',
    dataTable: this.moneyTable,
    /*dataTable: [
      ['年度', '売上', '費用'],
      ['2004',  1000,  400],
      ['2005',  1170,  460],
      ['2006',  660,   1120],
      ['2007',  1030,  540]
    ],*/
    options: {
      'title': 'Tasks',
      'height': 400,
      'legend': {position : 'in'},
      'gridlines': {'count': 12}
    },
  };
  fuelLineChartData =  {
    chartType: 'LineChart',
    dataTable: this.fuelTable,
    options: {
      'title': 'Tasks'
    },
  };
}