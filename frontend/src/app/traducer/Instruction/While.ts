import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/ret_v";
import * as generator from "../final/generator";

export class While extends Instruction{

    constructor(private condition : Expression, private code : Instruction, line : number, column : number){
        super(line, column);
    }


    /**
     * 
     * un while bonito
     * divide y venceras :p
     * 
     */
    public execute(env : Environment) {
        let a1 = generator.solicitarGoto();//goto de condicion
        generator.agregarLinea(`goto L${a1};`);
        generator.agregarLinea(`L${a1}:`);
        let condition = this.condition.execute(env);
        let a2 = generator.solicitarGoto();//goto de instruccion
        let cond = `if(${condition.value} >= 1){\ngoto I${a2};\n}`;
        let a3 = generator.solicitarGoto();
        let f1 = `goto S${a3};`;
        let ins = `I${a2}:`;
        generator.agregarLinea(cond);
        generator.agregarLinea(f1);
        generator.agregarLinea(ins);
        const element = this.code.execute(env);
        if(element != null || element != undefined){
            if(element.type == 'Break')
                generator.agregarLinea(f1);
            else if(element.type == 'Continue')
                generator.agregarLinea(`goto L${a1};`);
        }
        generator.agregarLinea(`goto L${a1};`);
        generator.agregarLinea(`S${a3}:`);

    }
}

/**
 * 
 * Este codigo NO participo en plagio con los otros compañeros del curso
 * 
 * pongo esto porque quede traumado con algo asi en el pasado :(    
 * 
 */