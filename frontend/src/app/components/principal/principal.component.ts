import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  codigo:string='';
  public parser = require('../../parser/grammar.js').parser;

  ngOnInit(): void {
  }


  public traduce(){

  }


}
