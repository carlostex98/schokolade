import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Retorno } from "../Abstract/ret_v";
import { type } from "os";
import * as generator from "../final/generator";

export class Access extends Expression{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const value = environment.getVar(this.id);
        let ps = environment.getPx(this.id);
        if(value == null){

            throw new Error("Variable inexistente");
            
        }
        //solicitamos la var del heap
        

        let n = generator.solicitarTemporal();
        let nx = generator.solicitarTemporal();
        let dif = ps - generator.getPx();
        let o = `t${nx} = p + ${dif}`;
        let t = `t${n} = stack[t${nx}]`;
        generator.agregarLinea(o);
        generator.agregarLinea(t);
            
        return {value : `t${n}`, type : value.type};
    }
}

/**
 * 
 * Este codigo NO participo en plagio con los otros compañeros del curso
 * 
 * pongo esto porque quede traumado con algo asi en el pasado :(    
 * 
 */