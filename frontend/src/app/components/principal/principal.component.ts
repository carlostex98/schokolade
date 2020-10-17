import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }
  
  trx: boolean = true;
  amn:boolean[]=[true, false,false,false];

  codeForm = new FormGroup({
    name : new FormControl('')
  });

  codigo:string='';
  public parser = require('../../parser/grammar.js').parser;

  ngOnInit(): void {
  }

  onSubmit():void{
    //console.log(this.codeForm.value);
    let a = this.parser.parse(this.codeForm.value.name);
    this.codigo=a;
    this.trx = false;
    
  }

  onBack():void{
    this.trx = true;
  }

  onSwitch(num):void{
    for (let i = 0; i < this.amn.length; i++) {
      if(i==num){
        this.amn[i]=true;
      }else{
        this.amn[i]=false;
      }
    }
  }

  public traduce(){

  }


}
