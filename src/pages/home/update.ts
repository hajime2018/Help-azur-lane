import { Component } from '@angular/core'
import { ViewController, NavParams, Keyboard } from 'ionic-angular';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    templateUrl: 'update.html'
})
export class UpdatePage {
  private update: FormGroup;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public keyboard: Keyboard,
    private formBuilder: FormBuilder
  ){
    this.update=this.formBuilder.group({
      level: [''],
      money: [''],
      fuel:['']
    });
  }

  submit() {
    this.viewCtrl.dismiss(this.update.value);
  }

  closeModal(){
    //console.log('closeModal');
    //this.viewCtrl.dismiss(this.);
  }
}