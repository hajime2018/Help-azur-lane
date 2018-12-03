import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { UpdatePage } from './update';
//import { AboutPage } from '../about/about';
//storage
import { Storage } from '@ionic/storage';
import { ValueTransformer } from '../../../node_modules/@angular/compiler/src/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user={level:null,money:null,fuel:null};

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {

  }

  async ionViewWillEnter() {
    /*const end = await this.storage.get('end_time');
    const today = new Date();
    if(today.getTime()>end.getTime()){
      console.log('date change');
      let alert = this.alertCtrl.create({
        title: 'Shoud update',
        subTitle: '日付が変わりました。更新してください',
        buttons: ['OK']
      });
      alert.present();
      const endToday = new Date(today.toDateString()+' 23:59:59');
      const startToday = new Date(today.toDateString()+' 00:00:00');
      console.log(endToday);
      const num = await this.storage.get('num_manage');
      for(let i = 0; i<num; i++){
        console.log('remove'+(i+1));
        //await this.storage.remove(String(i+1));
      }
      //await this.storage.set('start_time',startToday);
      //await this.storage.set('end_time',endToday);
    }
    else{
      console.log('today');
    }*/
    //get now data in home
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
    

  async openAbout(){
    await this.storage.forEach((value,key,index)=>{
      console.log(value);
      console.log(key);
    })
    /*const a = await this.storage.get('end_time');
    //console.log(a.toDateString());
    const b = new Date(a.toDateString()+' 00:00:00');
    this.storage.set('start_time',b);*/
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