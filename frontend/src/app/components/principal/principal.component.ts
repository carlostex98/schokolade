import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { graphviz } from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";
import { manager } from '../../traducer/final/nanager';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  trx: boolean = true;
  amn: boolean[] = [true, false, false, false];

  codeForm = new FormGroup({
    name: new FormControl('')
  });

  codigo: string = '';
  viz: string = '';
  sv: any;

  public parser = require('../../parser/grammar.js').parser;
  public gst = require('../../parser/ast.js').parser;
  public c3d = new manager();
  

  ngOnInit(): void {
  }

  onSubmit(): void {
    //console.log(this.codeForm.value);

    //let a = this.parser.parse(this.codeForm.value.name);
    //let b = this.gst.parse(a);
    //console.log(b);
    this.traduce(this.codeForm.value.name);
    this.trx = false;
    

  }

  onBack(): void {
    this.trx = true;
  }

  onSwitch(num): void {
    for (let i = 0; i < this.amn.length; i++) {
      if (i == num) {
        this.amn[i] = true;
      } else {
        this.amn[i] = false;
      }

      //para el ast
      if (num == 3) {
        //this.gra();

      }

    }
  }

  public traduce(cod) {
    this.c3d.analizar(cod);

  }


  public gra() {
    wasmFolder('/assets/@hpcc-js/wasm/dist/');
    try {
      this.sv = graphviz("div").renderDot(this.viz);
    } catch (error) {
      console.log("lala");
    }
  }

}
