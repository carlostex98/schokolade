import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Retorno } from "../Abstract/ret_v";
import { type } from "os";
import * as generator from "../final/generator";

export class Define extends Instruction{

    private value: Expression;
    constructor(private id: string, line : number, column: number, value:Expression){
        super(line, column);
        this.value = value;
    }

    public execute(environment: Environment) {
        const value = environment.getVar(this.id);
        let ps = environment.getPx(this.id);
        if(value == null){

            throw new Error("Variable inexistente");
            
        }
        //solicitamos la var del heap
        
        let val = this.value.execute(environment);
        let n = generator.solicitarTemporal();
        let nx = generator.solicitarTemporal();
        let dif = ps - generator.getPx();
        let o = `t${nx} = p + ${dif}`;
        let t = `t${n} = stack[t${nx}]`;
        let  f = `t${n} = ${val.value}`;
        let q = `stack[t${nx}] = t${n}`;
        generator.agregarLinea(o);
        generator.agregarLinea(t);
        generator.agregarLinea(f);
        generator.agregarLinea(q);

    }
}