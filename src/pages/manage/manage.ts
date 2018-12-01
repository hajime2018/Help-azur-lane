import { Component, ViewChild, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage{
  @ViewChild(Slides) slides: Slides;
  Manage: string;
  Slider: any;
  
  //moneyTable = new Array([]);
  //fuelTable = new Array([]);

  constructor(
    private storage: Storage,
  ){
    this.Manage = "money";
    this.Slider = [ {id: "money"}, {id: "fuel"} ];
  }

  async ionViewWillEnter() {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++){
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    }
    const num = await this.storage.get('num_manage');
    for(let i = 1; i <= num; i++){
      await this.storage.get(String(i)).then(val => {
        _lineChartData[0].data[i-1] = val.money;
        _lineChartData[1].data[i-1] = val.fuel;
      });
    }
    this.lineChartData = _lineChartData;
  }

  onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.Slider.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slides.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    console.log('Slide changed'+slider.getActiveIndex());
    const currentSlide = this.Slider[slider.getActiveIndex()];
    this.Manage = currentSlide.id;
  }

  /*moneyLineChartData =  {
    chartType: 'LineChart',
    dataTable: this.moneyTable,
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
      'title': 'Tasks',
    },
  };*/

  public lineChartData:Array<any> = [
    {data: [/*65, 59, 80, 81, 56, 55, 40*/], label: 'money'},
    {data: [/*28, 48, 40, 19, 86, 27, 90*/], label: 'fuel'},
    //{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    /*let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < 7; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;*/
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}