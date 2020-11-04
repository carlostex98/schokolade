import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/ret_v";
import * as generator from "../final/generator";

export class Dowhile extends Instruction {

    constructor(private condition: Expression, private code: Instruction, line: number, column: number) {
        super(line, column);
    }

    //sigue la misma logica que el while solo que con un dowhile :p
    public execute(envr: Environment) {
        let a3 = generator.solicitarGoto();
        let f1 = `goto S${a3};`;

        let t1 = generator.solicitarGoto();
        let tc1 = `goto S${t1};`;

        let a2 = generator.solicitarGoto();//goto de instruccion
        generator.agregarLinea(`goto I${a2};`);
        let ins = `I${a2}:`;
        generator.agregarLinea(ins);
        const element = this.code.execute(envr);
        if(element != null || element != undefined){
            if(element.type == 'Break')
                generator.agregarLinea(f1);
            else if(element.type == 'Continue')
                generator.agregarLinea(tc1);
        }
        generator.agregarLinea(tc1);
        generator.agregarLinea(`S${t1}:`)
        let condition = this.condition.execute(envr);
        let cond = `if(${condition.value} >= 1){\ngoto I${a2};\n}`;
        generator.agregarLinea(cond);
        generator.agregarLinea(f1);
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