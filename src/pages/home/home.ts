import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UpdatePage } from './update';
//import { AboutPage } from '../about/about';
//storage
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user={level:null,money:null,fuel:null};

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private storage: Storage
  ) {

  }

  ionViewWillEnter() {
    /*this.storage.get('end_time').then(val => {
      const today = new Date();
      if(today.getTime()>val.getTime()){
        //console.log(val);
        const setToday = new Date(today.toDateString()+' 23:59:59');
        console.log(setToday);
        //this.storage.set('start_time',val);
      }
      else{
        console.log(val+'n');
      }
    });*/
    this.storage.get('now').then(val=>{
      console.log('ionViewWillEnter'+val);
      if(val!==null){
        this.user = val;
      }
    });
  }

  openModal() {
    let updateModal = this.modalCtrl.create(UpdatePage,this.user);
    updateModal.present();
    updateModal.onDidDismiss(data => {
      if(data){
        console.log('Modal Data',data);
        this.storage.get('num_manage').then(val => {
          if(val){
            this.user=data;
            const nowTime =new Date();
            console.log('check');
            this.storage.set('now',data);
            this.storage.set('num_manage', ++val);
            this.storage.set(String(val), { time: nowTime, money: data.money, fuel: data.fuel });
            console.log(val);
          }
          else{
            this.user=data;
            const nowTime =new Date();
            console.log('else');
            this.storage.set('now',data);
            this.storage.set('num_manage',1);
            this.storage.set('1', { time: nowTime, money: data.money, fuel: data.fuel });
          }
        });
      }
    });
  }
    

  openAbout(){
    this.storage.get('6').then(val=>{console.log('time'+val.time+'fuel'+val.fuel+'money'+val.money)});
    const date= new Date('2018/10/14 23:12:11')
    this.storage.set('6',{time:date,money:40000,fuel:9000});
    //this.storage.clear();
  }

}

/*class StorageController {
  constructor(public storage: Storage){
      console.log(storage.ready());
  }
  public updateManage(update){
    this.storage.get('num_manage').then(val => {
      if(val){
          console.log('check');
          this.storage.set('now',update);
          this.storage.set('num_manage', ++val);
          this.storage.set(String(val), { time: Date(), money: update.money, fuel: update.fuel });
          console.log(val);
      }
      else{
          console.log('else');
          this.storage.set('now',update);
          this.storage.set('num_manage',1);
          this.storage.set('1', { time: Date(), money: update.money, fuel: update.fuel });
      }
  })
  }
}*/