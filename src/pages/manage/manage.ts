import { Component, ViewChild } from '@angular/core';
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
  moneyTable: number[] = [];
  fuelTable: number[] = [];
  //timeTable: string[] = [];

  constructor(
    private storage: Storage,
  ){
    this.Manage = "money";
    this.Slider = [ {id: "money"}, {id: "fuel"} ];
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
            //this.moneyTable.push([val.time, val.money]);
            //this.fuelTable.push([val.time, val.fuel]);
            this.moneyTable.push(val.money);
            this.fuelTable.push(val.fuel);
            //this.timeTable.push(val.time);
          });

        }
      }
    })
  }

  /*onSegmentChanged(segmentButton) {
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

  moneyLineChartData =  {
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

  public lineChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    /*scales: {
      xAxes: [{
          time: {
              unit: 'day'
          }
      }]
    }*/
  };
  public lineChartLabels:string[] = ['1','2','3','4','5','6'];
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = true;
 
  public lineChartData:any[] = [
    {data: this.moneyTable, label: 'money'},
    //{data: this.fuelTable, label: 'fuel'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  clicked(){
    console.log(this.lineChartData[0].data);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.lineChartData));
    clone[0].data = data;
    this.lineChartData = clone;
  }
}