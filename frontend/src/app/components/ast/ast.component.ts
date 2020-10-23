import { Component, OnInit } from '@angular/core';
import { graphviz }  from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    wasmFolder('/assets/@hpcc-js/wasm/dist/');
    graphviz("div").renderDot('digraph  {a -> b}');
  }

}
